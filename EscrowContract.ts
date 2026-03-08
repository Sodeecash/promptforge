import {
  OP_NET,
  Address,
  u256,
  Blockchain,
  CallResponse,
  Event
} from '@btc-vision/btc-runtime/runtime';
import { StoredU256 } from '@btc-vision/btc-runtime/runtime/storage/StoredU256';
import { StoredBoolean } from '@btc-vision/btc-runtime/runtime/storage/StoredBoolean';
import { StoredAddress } from '@btc-vision/btc-runtime/runtime/storage/StoredAddress';

/**
 * @title EscrowContract
 * @notice OP_NET Bitcoin Layer 1 Escrow
 * @network Bitcoin Testnet via OP_NET
 * @version 1.0.0
 *
 * ARCHITECTURE:
 * - Buyer deposits BTC into escrow
 * - Arbiter (trusted third party) decides outcome
 * - Arbiter can release funds to seller OR refund buyer
 * - Reentrancy protection via mutex lock
 * - CEI (Checks-Effects-Interactions) pattern enforced
 *
 * DEPLOY: npx opnet deploy --network testnet --contract EscrowContract
 */
export class EscrowContract extends OP_NET {

  // ——— Persistent Storage ———
  private readonly buyer: StoredAddress        = new StoredAddress(Blockchain.SELECTOR, 0);
  private readonly seller: StoredAddress       = new StoredAddress(Blockchain.SELECTOR, 1);
  private readonly arbiter: StoredAddress      = new StoredAddress(Blockchain.SELECTOR, 2);
  private readonly depositAmount: StoredU256   = new StoredU256(Blockchain.SELECTOR, 3);
  private readonly isDeposited: StoredBoolean  = new StoredBoolean(Blockchain.SELECTOR, 4);
  private readonly isReleased: StoredBoolean   = new StoredBoolean(Blockchain.SELECTOR, 5);
  private readonly isRefunded: StoredBoolean   = new StoredBoolean(Blockchain.SELECTOR, 6);
  private readonly locked: StoredBoolean       = new StoredBoolean(Blockchain.SELECTOR, 7);

  // ——— Events ———
  public readonly FundsDeposited: Event = Event.from('FundsDeposited', ['address', 'uint256']);
  public readonly FundsReleased: Event  = Event.from('FundsReleased',  ['address', 'uint256']);
  public readonly FundsRefunded: Event  = Event.from('FundsRefunded',  ['address', 'uint256']);
  public readonly EscrowCreated: Event  = Event.from('EscrowCreated',  ['address', 'address', 'address']);

  /**
   * @param _buyer   Bitcoin address of buyer
   * @param _seller  Bitcoin address of seller
   * @param _arbiter Bitcoin address of trusted arbiter
   */
  constructor(_buyer: Address, _seller: Address, _arbiter: Address) {
    super();
    // Access control: only the deploying address can initialize
    this.onlyOwner();

    // Input validation
    this.require(_buyer !== Address.zero(),   'Invalid buyer address');
    this.require(_seller !== Address.zero(),  'Invalid seller address');
    this.require(_arbiter !== Address.zero(), 'Invalid arbiter address');
    this.require(_buyer !== _seller,          'Buyer and seller must differ');

    this.buyer.set(_buyer);
    this.seller.set(_seller);
    this.arbiter.set(_arbiter);
    this.locked.set(false);
    this.isDeposited.set(false);
    this.isReleased.set(false);
    this.isRefunded.set(false);

    this.emit(this.EscrowCreated, [_buyer, _seller, _arbiter]);
    this.log('EscrowContract deployed to OP_NET Testnet');
  }

  /**
   * @notice Buyer deposits BTC into the escrow vault
   * @dev Only callable once; reentrancy guarded
   */
  @method
  public deposit(): CallResponse {
    this.nonReentrant();

    // Access control
    this.require(
      Blockchain.msgSender() === this.buyer.get(),
      'EscrowContract: only buyer can deposit'
    );

    // State check
    this.require(!this.isDeposited.get(), 'EscrowContract: already deposited');

    // Input validation
    const amount = Blockchain.msgValue();
    this.require(amount > u256(0), 'EscrowContract: deposit amount must be > 0');

    // Effects (state updates before interactions)
    this.depositAmount.set(amount);
    this.isDeposited.set(true);

    // Events
    this.emit(this.FundsDeposited, [this.buyer.get(), amount]);
    this.log(`Escrowed ${amount} satoshis from buyer`);

    this.unlock();
    return CallResponse.ok();
  }

  /**
   * @notice Arbiter releases escrowed funds to seller
   * @dev Checks-Effects-Interactions; reentrancy guarded
   */
  @method
  public release(): CallResponse {
    this.nonReentrant();

    // Access control
    this.require(
      Blockchain.msgSender() === this.arbiter.get(),
      'EscrowContract: only arbiter can release'
    );

    // State checks
    this.require(this.isDeposited.get(),   'EscrowContract: no funds in escrow');
    this.require(!this.isReleased.get(),   'EscrowContract: already released');
    this.require(!this.isRefunded.get(),   'EscrowContract: already refunded');

    // Effects — update state BEFORE transfer (CEI pattern)
    const amount = this.depositAmount.get();
    this.isReleased.set(true);

    // Interaction — safe external call after state update
    Blockchain.transfer(this.seller.get(), amount);

    this.emit(this.FundsReleased, [this.seller.get(), amount]);
    this.log(`Released ${amount} satoshis to seller`);

    this.unlock();
    return CallResponse.ok();
  }

  /**
   * @notice Arbiter refunds escrowed funds back to buyer
   */
  @method
  public refund(): CallResponse {
    this.nonReentrant();

    this.require(
      Blockchain.msgSender() === this.arbiter.get(),
      'EscrowContract: only arbiter can refund'
    );
    this.require(this.isDeposited.get(),  'EscrowContract: no funds to refund');
    this.require(!this.isReleased.get(),  'EscrowContract: already released');
    this.require(!this.isRefunded.get(),  'EscrowContract: already refunded');

    const amount = this.depositAmount.get();
    this.isRefunded.set(true);

    Blockchain.transfer(this.buyer.get(), amount);

    this.emit(this.FundsRefunded, [this.buyer.get(), amount]);
    this.log('Funds refunded to buyer');

    this.unlock();
    return CallResponse.ok();
  }

  /**
   * @notice Returns current escrow state
   */
  @view
  public getStatus(): object {
    return {
      buyer:     this.buyer.get(),
      seller:    this.seller.get(),
      arbiter:   this.arbiter.get(),
      amount:    this.depositAmount.get(),
      deposited: this.isDeposited.get(),
      released:  this.isReleased.get(),
      refunded:  this.isRefunded.get()
    };
  }

  // ——— Reentrancy Guard ———
  private nonReentrant(): void {
    this.require(!this.locked.get(), 'EscrowContract: ReentrancyGuard — reentrant call');
    this.locked.set(true);
  }

  private unlock(): void {
    this.locked.set(false);
  }
}

module 0x1::basic_coin {
    use std::signer;
    use std::option::{Self, Option};

    /// Errors
    const ENOT_ENOUGH_BALANCE: u64 = 0;
    const EINSUFFICIENT_BALANCE: u64 = 1;
    const EALREADY_INITIALIZED: u64 = 2;

    /// The holder of a balance
    struct Balance has key {
        value: u64,
    }

    /// Capability that allows the holder to burn coins
    struct BurnCapability has key {
        account: address,
    }

    /// Capability that allows the holder to mint coins
    struct MintCapability has key {
        account: address,
    }

    /// A wrapper around u64 that has the `drop` ability
    struct Coin has store {
        value: u64,
    }

    /// Initialize the BasicCoin module
    fun init_module(account: &signer) {
        // Publish the resource that holds the total supply
        move_to(account, TotalSupply { value: 0 });
        // Publish the burn capability
        move_to(account, BurnCapability { account: signer::address_of(account) });
        // Publish the mint capability
        move_to(account, MintCapability { account: signer::address_of(account) });
    }

    /// The total supply of coins
    struct TotalSupply has key {
        value: u64,
    }

    /// Mint a new coin with the given value
    public fun mint(account: &signer, value: u64, _capability: &MintCapability): Coin {
        let coin = Coin { value };
        let account_addr = signer::address_of(account);
        if (!exists<Balance>(account_addr)) {
            move_to(account, Balance { value: 0 });
        };
        let balance = borrow_global_mut<Balance>(account_addr);
        balance.value = balance.value + value;
        let total_supply = borrow_global_mut<TotalSupply>(@0x1);
        total_supply.value = total_supply.value + value;
        coin
    }

    /// Burn the coin
    public fun burn(coin: Coin, capability: &BurnCapability) {
        let Coin { value } = coin;
        let total_supply = borrow_global_mut<TotalSupply>(@0x1);
        total_supply.value = total_supply.value - value;
    }

    /// Transfer `amount` of coins from `from` to `to`
    public fun transfer(from: &signer, to: address, amount: u64) acquires Balance {
        let check = withdraw(from, amount);
        deposit(to, check);
    }

    /// Withdraw `amount` of coins from the balance under `account`
    public fun withdraw(account: &signer, amount: u64): Coin acquires Balance {
        let account_addr = signer::address_of(account);
        let balance = borrow_global_mut<Balance>(account_addr);
        if (balance.value < amount) {
            abort EINSUFFICIENT_BALANCE
        };
        balance.value = balance.value - amount;
        Coin { value: amount }
    }

    /// Deposit `coin` to the balance under `to`
    public fun deposit(to: address, coin: Coin) acquires Balance {
        let coin_value = coin.value;
        if (!exists<Balance>(to)) {
            move_to(&account, Balance { value: 0 });
        };
        let balance = borrow_global_mut<Balance>(to);
        balance.value = balance.value + coin_value;
        let Coin { value: _ } = coin;
    }

    /// Return the balance of `addr`
    public fun balance_of(addr: address): u64 acquires Balance {
        if (!exists<Balance>(addr)) {
            return 0
        };
        borrow_global<Balance>(addr).value
    }

    /// Return the total supply of coins
    public fun total_supply(): u64 acquires TotalSupply {
        borrow_global<TotalSupply>(@0x1).value
    }

    /// Destroy the coin
    public fun destroy_zero(coin: Coin) {
        let Coin { value } = coin;
        assert!(value == 0, ENOT_ENOUGH_BALANCE);
    }
} 
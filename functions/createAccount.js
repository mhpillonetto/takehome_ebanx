export default createAccount = (id, balance) => {
    store.accounts.push({
        id, balance
    })
}
const Cryptolance = artifacts.require("Cryptolance");

contract("Cryptolance", accounts => {

    console.log(accounts);

    let instance = null;
    before(async () => {
        instance = await Cryptolance.deployed()
    })

    const projectId = "12345"
    const description = web3.utils.utf8ToHex('IPFS Description')
    const files = web3.utils.utf8ToHex('IPFS Files')
    const amountInEther = 1;
    it("should add a project", async () => {
        let balanceBefore = await web3.eth.getBalance(instance.address)

        await instance.addProject(projectId, "Title", description, files, amountInEther, accounts[1], {from: accounts[0], value: web3.utils.toWei(amountInEther.toString(), 'ether') })

        let balanceAfter = await web3.eth.getBalance(instance.address)
        
        assert.notEqual(balanceBefore, balanceAfter)
    })

    it("should release payment", async () => {
        await instance.releasePayment(projectId, {from: accounts[0]})
    })

    it("should complete the project", async () => {
        let balanceBefore = await web3.eth.getBalance(instance.address)

        await instance.completeProject(accounts[0], projectId, {from: accounts[1]})

        let balanceAfter = await web3.eth.getBalance(instance.address)

        assert.notEqual(balanceBefore, balanceAfter)

        const freelancerBalance = await web3.eth.getBalance(accounts[1])
        console.log(web3.utils.fromWei(freelancerBalance, 'ether'))
    })
})
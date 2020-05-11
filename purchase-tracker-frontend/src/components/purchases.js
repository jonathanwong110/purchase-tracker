class Purchases {
    constructor() {
        this.purchases = []
        this.adapter = new PurchasesAdapter()
        this.initiBindingsAndEventListeners()
        this.fetchAndLoadPurchases()
    }

    initiBindingsAndEventListeners() {
        this.purchasesContainer = document.getElementById('purchases-container')
        this.newPurchaseTitle = document.getElementById('new-purchase-title')
        this.newPurchasePrice = document.getElementById('new-purchase-price')
        this.newPurchaseDescription = document.getElementById('new-purchase-description')
        this.newPurchaseImage = document.getElementById('new-purchase-image')
        this.purchaseForm = document.getElementById('new-purchase-form')
        this.purchaseForm = document.getElementById('new-purchase-form')
        this.purchaseForm.addEventListener('submit', this.createPurchase.bind(this))
        this.purchasesContainer.addEventListener('dblclick', this.handlePurchaseClick.bind(this))
    }

    handlePurchaseClick(e) {
        const card = e.target
        if (card.attributes && card.attributes.class && card.attributes.class.value === "selectable") {
            card.contentEditable = true
            card.focus()
            card.classList.add('editable')
        }
    }

    createPurchase(e) {
        e.preventDefault()
        const titleValue = this.newPurchaseTitle.value
        const priceValue = this.newPurchasePrice.value
        const descriptionValue = this.newPurchaseDescription.value
        const imageValue = this.newPurchaseImage.value
        this.adapter.createPurchase(titleValue, priceValue, descriptionValue, imageValue).then(purchase => {
            this.purchases.push(new Purchase(purchase))
            this.newPurchaseTitle.value = ""
            this.newPurchasePrice.value = ""
            this.newPurchaseDescription.value = ""
            this.newPurchaseImage.value = ""
            this.render()
        })
    }

    fetchAndLoadPurchases() {
        this.adapter.getPurchases().then(purchases => {
            purchases.forEach(purchase => this.purchases.push(new Purchase(purchase)))
        })
        .then(() => {
            this.render()
        })
    }


    render() {
        this.purchasesContainer.innerHTML = this.purchases.map(purchase => purchase.renderCard()).join('')
    }

}
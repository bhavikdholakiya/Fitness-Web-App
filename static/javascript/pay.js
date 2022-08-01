
let price;

var stripeHandler = StripeCheckout.configure({
    
    key: stripePublicKey,
    locale: 'en',
    token: function (token) {
        let main=document.getElementById('plan-display').value;
        fetch('/user/pay/?plan='+main, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                amount:price
            })
        }).then(function (res) {
            return res.json()
        }).then(function (data) {
            console.log(data);
            window.location.href='/user/dashboard'
        }).catch(function (error) {
            console.error(error)
        })
    }
})
function purchaseClicked() {
    let amount=document.getElementById('amount').value;
    amount=parseFloat(amount);
    price=amount;
    stripeHandler.open({
        amount: amount
    })
}
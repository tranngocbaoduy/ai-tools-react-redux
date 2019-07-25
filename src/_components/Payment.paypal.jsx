import React from 'react'; 
import {connect} from 'react-redux'  
import PaypalExpressBtn from 'react-paypal-express-checkout';


class PaypalButton extends React.Component { 
    render() {
		const onSuccess = (payment) => {
			// 1, 2, and ... Poof! You made it, everything's fine and dandy!
            		console.log("Payment successful!", payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
		}

		const onCancel = (data) => {
			// The user pressed "cancel" or closed the PayPal popup
			console.log('Payment cancelled!', data);
			// You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
		}

		const onError = (err) => {
			// The main Paypal script could not be loaded or something blocked the script from loading
			console.log("Error!", err);
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
		}

		let env = 'sandbox'; // you can set this string to 'production'
		let currency = 'USD'; // you can set this string from your props or state  
		let total = 0.01;  // this is the total amount (based on currency) to charge
		// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

		const client = {
			sandbox:    'AXBbOcgwagf16xrT7ibcj53Vx7azd9yFZT6fhe2aaUiFbgUfcWurSFtxHlh6o5mvJcnK-Tn04Bbv35T4',
			production: 'Ad53Q610_KLVjKl479irWZ-ABY6P2-uDDWR1vugn57Koctr3PYdrGAiJX2hBiEACh42G0ACB5NCDoXbX',
		}
		// In order to get production's app-ID, you will have to send your app to Paypal for approval first
		// For your sandbox Client-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App" unless you have already done so):
		//   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
		// Note: IGNORE the Sandbox test AppID - this is ONLY for Adaptive APIs, NOT REST APIs)
		// For production app-ID:
		//   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

		// NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <PaypalExpressBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} />
        );
    }
}
 
function mapStateToProps(store) {
    const { loggingIn,loggedIn } = store.authentication;
    const { alert } = store;  
    return {
        loggingIn,
        alert,
        loggedIn
    };
}

const connectedPaymentPaypal = connect(mapStateToProps)(PaypalButton);
export { connectedPaymentPaypal as PaypalButton }; 
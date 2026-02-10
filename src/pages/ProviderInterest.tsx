// import './providerinterest.css';

function ProviderInterest() {
    return (
        <div className="provider-interest">
            <h1>Provider Interest</h1>
            <p>Thank you for your interest in becoming a provider on Manly. We are currently in the early stages of development and are not yet accepting new providers. However, we would love to hear from you and keep you updated on our progress.</p>
            <p>If you are interested in becoming a provider, please fill out the form below and we will reach out to you when we are ready to onboard new providers.</p>
            <form className="interest-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                
                <label htmlFor="service">Service Offered:</label>
                <input type="text" id="service" name="service" required />          
            </form>
            <button type="submit" className="submit-button">Submit</button>
        </div>
    );
}

export default ProviderInterest;
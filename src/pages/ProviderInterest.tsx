import { useState } from 'react';
import './ProviderInterest.css';

function ProviderInterest() {
    const [form, setForm] = useState({ name: '', email: '', service: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: send `form` to API when available
        setSubmitted(true);
    };

    return (
        <div className="provider-interest">
            <header className="provider-interest__header">
                <h1>Provider Interest</h1>
                <p className="provider-interest__intro">
                    Thank you for your interest in becoming a provider on Manly. We're building the platform and would love to keep you
                    informed when onboarding opens.
                </p>
            </header>

            {!submitted ? (
                <form className="provider-interest__form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="field">
                        <label htmlFor="service">Service Offered</label>
                        <input id="service" name="service" type="text" value={form.service} onChange={handleChange} required />
                    </div>

                    <div className="actions">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
            ) : (
                <div className="provider-interest__success">
                    <h2>Thanks — we'll be in touch</h2>
                    <p>We've received your interest and will reach out when provider onboarding opens.</p>
                </div>
            )}
        </div>
    );
}

export default ProviderInterest;
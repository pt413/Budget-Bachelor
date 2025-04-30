import React, { useState } from 'react';
import axios from 'axios';
import './BudgetRecommendation.css'

function BudgetRecommendation() {
    console.log("BudgetRecommendation component is rendered!");

    const mainCategories = ['Rent', 'Groceries', 'Transport', 'Eating_out', 'Savings'];

    const [income, setIncome] = useState('');
    const [age, setAge] = useState('');
    const [cityTier, setCityTier] = useState('');
    const [interestTravel, setInterestTravel] = useState('');
    const [interestFood, setInterestFood] = useState('');
    const [interestTech, setInterestTech] = useState('');
    const [interestFitness, setInterestFitness] = useState('');

    const [recommendation, setRecommendations] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            income: parseFloat(income),
            age: parseInt(age),
            cityTier: parseInt(cityTier),
            dependents: 0,
            occupation: 0,
            interest_travel: parseInt(interestTravel)?1:0,
            interest_food: parseInt(interestFood)?1:0,
            interest_tech: parseInt(interestTech)?1:0,
            interest_fitness: parseInt(interestFitness)?1:0,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/recommend/', requestData , {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setRecommendations(response.data);
            console.log('Recommendation response:', response.data);
            console.log('Recommendation:', recommendation);
        } catch (error) {
            console.error('Error fetching budget recommendation:', error);
        }
    };
    const mainCategoryData = [];
    const interestCategoryData = [];

    if (recommendation) {
        Object.entries(recommendation).forEach(([category, amount]) => {
            if (mainCategories.includes(category)) {
                mainCategoryData.push({ name: category, amount });
            } else {
                interestCategoryData.push({ name: category, amount });
            }
        });
    }

    return (
        <div>
            <h2>Budget Recommendation</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Monthly Income" required />
                <br></br>
                <br></br>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
                <br></br>
                <br></br>
                <select value={cityTier} onChange={(e) => setCityTier(e.target.value)} required>
                    <option value="" disabled>Select City Tier</option>
                    <option value="Tier 1">Tier 1(Metro)</option>
                    <option value="Tier 2">Tier 2</option>
                    <option value="Tier 3">Tier 3</option>
                </select>
                <br></br>
                <br></br>
                <h3>Interests</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <label htmlFor="travel">Travel</label>
                    <input
                        type="checkbox"
                        id="travel"
                        checked={interestTravel}
                        onChange={(e) => setInterestTravel(e.target.checked ? 1 : 0)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.0rem', marginBottom: '0.5rem' }}>
                    <label htmlFor="food">Food</label>
                    <input
                        type="checkbox"
                        id="food"
                        checked={interestFood}
                        onChange={(e) => setInterestFood(e.target.checked ? 1 : 0)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '0.5rem' }}>
                    <label htmlFor="tech">Games</label>
                    <input
                        type="checkbox"
                        id="tech"
                        checked={interestTech}
                        onChange={(e) => setInterestTech(e.target.checked ? 1 : 0)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', marginBottom: '0.5rem' }}>
                    <label htmlFor="fitness">Fitness</label>
                    <input
                        type="checkbox"
                        id="fitness"
                        checked={interestFitness}
                        onChange={(e) => setInterestFitness(e.target.checked ? 1 : 0)}
                    />
                </div>
                <button type="submit" className='btn btn--dark' onClick={()=>console.log("Button Clicked!")}>Get Recommendation</button>
            </form>

            {recommendation && (
            <div className="recommendation-container">
                <h2>Your Personalized Budget Recommendations</h2>
                <div className="income-age-info">
                    <h5>Based on your monthly income, age, and preferences, we recommend the following budget allocation:</h5>
                </div>
                <div className="categories-grid">
                    {/* Main Categories */}
                    <div className="category-column">
                        <h3>Main Categories</h3>
                        {mainCategoryData.map((item, index) => (
                        <div key={index} className="category-card">
                            <div className="category-header">
                                <span>{item.name}</span>
                                <span>₹{Math.round(item.amount)}</span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-filled"
                                    style={{ width: `${((item.amount) / income) * 100}%` }}
                                ></div>
                            </div>
                            <div className="category-footer">
                                <span style={{ marginLeft: 'auto'}}>
                                    {((item.amount) / income * 100).toFixed(2)}%
                                </span>
                            </div>
                        </div>
                        ))}
                    </div>

                    {/* Interest Based Categories */}
                    <div className="category-column">
                        <h3>Based on Your Interests</h3>
                        {interestCategoryData.map((item, index) => {
                        if (item.name === 'Food' && !interestFood) return null;   
                        return (
                        <div key={index} className="category-card">
                            <div className="category-header">
                                <span>{item.name === 'Tech' ? 'Games' : item.name}</span>
                                <span>₹{Math.round(item.amount)}</span>
                            </div>
                        <div className="progress-bar interest-progress">
                            <div className="progress-filled" style={{ width: `${((item.amount) / income) * 100}%` }}></div>
                        </div>
                        <div className="category-footer">
                            <span style={{ marginLeft: 'auto'}}>
                                {((item.amount) / income * 100).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                        );
                        })}
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default BudgetRecommendation;
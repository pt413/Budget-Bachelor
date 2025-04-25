import React, { useState } from 'react';
import axios from 'axios';

function BudgetRecommendation() {
    console.log("BudgetRecommendation component is rendered!");

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
        } catch (error) {
            console.error('Error fetching budget recommendation:', error);
        }
    };

    return (
        <div>
            <h2>Budget Recommendation</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Income" required />
                <br></br>
                <br></br>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
                <br></br>
                <br></br>
                <input type="number" value={cityTier} onChange={(e) => setCityTier(e.target.value)} placeholder="City Tier" required />
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.3rem', marginBottom: '0.5rem' }}>
                    <label htmlFor="tech">Tech</label>
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
                <div>
                    <br></br>
                    <h2>Recommendations</h2>
                    <br></br>
                    <h5>You can save money in following categories:</h5>
                    <br></br>
                    <div>
                        <ul>
                            <li>Rent: {Math.round(recommendation.Rent/10)}</li>
                            <li>Groceries: {Math.round(recommendation.Groceries/10)}</li>
                            <li>Transport: {Math.round(recommendation.Transport/10)}</li>
                            <li>Eating Out: {Math.round(recommendation.Eating_Out/10)}</li>
                            <li>Savings: {Math.round(recommendation.Savings/10)}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BudgetRecommendation;
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, reset, incrementByAmount} from './CounterSlice';
import {useState, useEffect} from 'react';


const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(0);
    const addvalue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    }

    return (
        <section>
        <p>{count}</p>
        <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        </div>
        <input 
            type='text' 
            value = {incrementAmount}
            onChange = {(e) => setIncrementAmount(e.target.value)}
        />
        <div>
            <button onClick={() => dispatch(incrementByAmount(addvalue))}>Add Amount</button>
            <button onClick={() => resetAll()}>Reset</button>        
        </div>
        </section>
    )
}

export default Counter;



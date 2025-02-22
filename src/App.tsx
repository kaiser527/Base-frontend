import { decrement, increment } from "./redux/slice/countSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

const App = () => {
  const dispatch = useAppDispatch();

  const count = useAppSelector((state) => state.counter.value);

  return (
    <div>
      {count}
      <div>
        <button onClick={() => dispatch(increment())}>increase</button>
        <button onClick={() => dispatch(decrement())}>decrease</button>
      </div>
    </div>
  );
};

export default App;

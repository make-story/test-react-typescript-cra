// https://usehooks-ts.com/react-hook/use-interval
// https://mingule.tistory.com/65
import { useEffect, useState } from 'react';

const useInterval = (callback, delay) => {
  const [savedCallback, setSavedCallback] = useState(null) // useState사용

  // callback이 바뀔 때마다 실행
  // 첫 실행에 callback이 한 번 들어옴 -> 리렌더링 -> 다시 들어옴 -> 리렌더링 -> .. 무한 반복
  // 원래의 의도는 callback이 새로 들어오면 그 callback을 저장해두고 아래의 setInterval을 다시 실행해주려는 의도
  useEffect(() => {
    setSavedCallback(callback);
  }, [callback]);
  
  // mount가 끝나고 1번 일어남
  // 맨 처음 mount가 끝나고 savedCallback은 null이기 때문에 setInterval의 executeCallback이 제대로 실행되지 않음 (null이기 때문에)
  useEffect(() => {
    console.log(savedCallback());
    const executeCallback = () => {
      savedCallback();
    };
    // 일시정지 가능
    /*
    useInterval(() => {
        setCount(count + 1);
    }, isRunning ? delay : null);
    */
    if (delay !== null) { // 만약 delay가 null이 아니라면 
        const timerId = setInterval(executeCallback, delay);

        return () => clearInterval(timerId);
    }
  }, []);
};

export default useInterval;
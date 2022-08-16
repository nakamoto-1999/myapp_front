import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export const useDidUpdateEffect = (fn : EffectCallback , deps : DependencyList)=>{
    const isMounted = useRef(false);
    useEffect(()=>{
        if(!isMounted.current){
            isMounted.current = true;
            return;
        }
        fn();
    } ,deps);
}
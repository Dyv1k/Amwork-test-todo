import {useEffect, useRef} from "react";
import { observerType } from "../config";

export const useObserver = ({ref, canLoad, isLoading, callback}: observerType) => {
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();

        var observerCallback: IntersectionObserverCallback = function(entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        };
        
        observer.current = new IntersectionObserver(observerCallback);
        if (ref.current) {
            observer.current.observe(ref.current);
        }

        return () => {
            if (observer.current) {
              observer.current.disconnect();
            }
        };

    }, [isLoading])
}
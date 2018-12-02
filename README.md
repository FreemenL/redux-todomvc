# redux-todomvc
redux-todomvc
###### logger
```bash
/**
 * logger 中间件
 * @param  {Function} {dispatch,getState}) [description]
 * @return {[type]}                          [description]
 */
const  logger = ({dispatch,getState})=>(next)=>(action)=>{
	console.log("旧状态",getState());
	next(action);//派发状态
	console.log("新状态",getState());
}
```

###### thunk 
```bash
/**
 * thunk 中间件  判断action 的类型手否是函数。如果是函数就执行函数 不是函数分发action
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} options.getState [description]
 * @return {[type]}                  [description]
 */
const thunk = ({dispatch,getState})=>next=>action=>{
     if(typeof action=="function"){
     	action(dispatch,getState);
     }else{
     	next(action);
     }
}
```
###### promise 

```bash 
//promise 中间件
const promise = ({dispatch,getState})=>next=>action=>{
     if(!!action&& typeof action.then=="function"){
     	action.then(dispatch);
     }else if(action.text&&action.text.then){
     	action.text.then(text=>dispatch({...action,text}),text=>dispatch({...action,text}))
     }else{
     	next(action);
     }
}
```

###### componse 
```bash 

/**
 * [componse description] 串接各个中间件 
 *第一次执行的时候a的值为logger  b的值为thunk
 *第二次执行的时候 a的值就是logger(thunk)的结果 b的值就是promise
 *所以这个地方就有个递归的关系  也就是实际的执行结果是从右往做的
 */
function componse(...fns){
	return fns.reduce((a,b)=>(...args)=>a(b(...args)));
}

```

###### applyMiddleware

```bash 
/**
 * redux 的中间件 函数 
 * @param  {...[type]} middlewares) []
 * @return {[type]}                 [description]
 */
const applyMiddleware = (...middlewares)=>(createStore)=>(reducer)=>{
	//获取到createStore和reducer 创建store 
	const store = createStore(reducer);
	let dispatch;
	let middlewareAPI = {
		getState:store.getState,
		dispatch:action=>dispatch(action) //此处的dispatch 为包装后的dispatch 
	}
	//把 getState 和 dispath 方法传给 各个中间件 
	middlewares = middlewares.map( middleware => middleware(middlewareAPI) );
	//包装后的dispatch 传给各个中间件   
	dispatch = componse(...middlewares)(store.dispatch);

	return { ...store, dispatch };
}


```

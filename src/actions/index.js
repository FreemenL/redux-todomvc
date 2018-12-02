import * as types from 'contants/ActionTypes';

export const addTodo = text =>({type:types.ADD_TODO,text});
export const completeAll = () => ({type:types.COMPLETE_ALL});
export const completeTodo = (id) => ({type:types.COMPLETE_TODO,id});
export const deleteTodo = id => ({ type: types.DELETE_TODO, id });
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });


// export const addTodos = text =>(dispatch,getState)=>{
// 	setTimeout(()=>{
// 		dispatch({type:types.ADD_TODO,text});
// 	},1000)
// }
export const addTodos = text =>({type:types.ADD_TODO,text:new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(text)
		},1000)
	})
});

// export const addTodos = text => {
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(()=>{
// 			resolve({type:types.ADD_TODO,text})
// 		},1000);
// 	})
// }











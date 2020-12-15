import React, { useCallback }from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
    // react-virtualized 를 활용하여 화면에 보여지는 부분만 렌더링 (최적화)
    // react-virtualized 의 List 이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아 와서 사용합니다.
    const rowRenderer = useCallback(
        ({ index, key, style }) => {
            const todo = todos[index];
            return (
                <TodoListItem 
                    todo={todo}
                    key={key}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    style={style}
                />
            );
        },
        [onRemove, onToggle, todos],
    );

    // 성능개선 전 
    /*return (
        <div className="TodoList">
            {todos.map(todo => (
                <TodoListItem 
                    todo={todo} 
                    key={todo.id} 
                    onRemove={onRemove} 
                    onToggle={onToggle}
                />    
            ))}
        </div>
    );*/
    // 성능개선 후 - react-virtualized
    return (
        <List 
            className="TodoList"
            width={512}
            height={513}
            rowCount={todos.length} // 항목 개수
            rowHeight={57} // 항목 높이
            rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수 
            list={todos} // 배열 
            style={{ outline: 'none' }} // List 에 기본 적용되는 outline 스타일 제거 
        />
    );
};

export default React.memo(TodoList);
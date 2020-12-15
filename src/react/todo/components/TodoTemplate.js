import React from 'react';
import './TodoTemplate.scss'; // 가급적 브라우저를 한쪽 화면에 띄워 놓고 각 스타일 코드가 실제로 어떠한 변화를 주는지 확인하면서 작성해 보는 것을 추천

const TodoTemplate = ({ children }) => {
    // children: 리액트 컴포넌트를 사용할 때 컴포넌트 태그 사이의 내용을 보여 주는 props
    // props.children -> { children }
    return (
        <div className="TodoTemplate">
            <div className="app-title">일정관리</div>
            <div className="content">{children}</div>
        </div>
    );
};

export default TodoTemplate;
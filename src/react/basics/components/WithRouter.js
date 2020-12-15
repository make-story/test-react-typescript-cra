/*
withRouter 함수는 HoC(Higher-order Component) 입니다.
라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해 줍니다.

URL 파라미터
URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아 오는 match 라는 객체 안의 param 값을 참조합니다.
match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어 있습니다.
/profiles/:username 라고 넣어 주면, match.params.username 값을 통해 현재 username 값을 조회할 수 있습니다.

URL 쿼리
커리는 location 객체에 들어 있는 search 값에서 조회할 수 있습니다.
location 객체는 라우트로 사용된 컴포넌트에게 props 로 전달되며, 웹 애플리케이션의 현재 주소에 대한 정보를 지니고 있습니다.

history
history 객체는 라우트로 사용된 컴포넌트에 match, location 과 함께 전달되는 props 중 하나로,
이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있습니다.
예를 들어 특정 버튼을 눌렀을 때 뒤로 가거나, 로그인 후 화면을 전환하거나, 다른 페이지로 이탈하는 것을 방지해야 할 때 history 를 활용합니다.
*/
import React from 'react';
import { withRouter } from 'react-router-dom';

const withRouterSample = ({ location, match, history }) => {
    return (
        <div>
            <h4>location</h4>
            <textarea
                value={JSON.stringify(location, null, 2)}
                rows={7}
                readOnly={true}
            />
            <h4>match</h4>
            <textarea
                value={JSON.stringify(match, null, 2)}
                rows={7}
                readOnly={true}
            />
            <div>
                <button onClick={() => history.push('/basics')}>홈으로</button>
            </div>
        </div>
    );
};

export default withRouter(withRouterSample);
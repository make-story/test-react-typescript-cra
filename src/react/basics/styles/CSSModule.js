/*
CSS Module : 스타일을 작성할 때 CSS 클래스가 다른 CSS 클래스의 이름과 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해 주는 옵션입니다.

CSS Module 은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값, 
즉 [파일이름]_[클래스이름]_[해시값] 형태로 자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해 주는 기술 입니다.

CSS Module 을 사용하면 클래스 이름을 지을 때 그 고유성에 대해 고민하지 않아도 됩니다.
흔히 사용하는 단어로 이름을 짓는다고 해도 전혀 문제가 되지 않습니다.
해당 클래스는 불러온 컴포넌트 내부에서만 작동하기 때문입니다.
*/
import React from 'react';
import styles from './CSSModule.module.css'; // CSS 모듈의 파일명은 xxx.module.css 형태를 가진다. (웹팩 등 번들링 도구 규칙적용)

const CSSModule = () => {
	return (
		<div className={styles.wrapper}>
			안녕하세요.
			<span className="something">CSS Module!</span>
			<div className={`${styles.test1} ${styles.test2}`}>
				두 개 이상 클래스 적용!
			</div>
		</div>
	);
};

export default CSSModule;
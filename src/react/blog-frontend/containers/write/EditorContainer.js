import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
	const dispatch = useDispatch();
	const { title, body } = useSelector(({ write /*각 스토어 list, loading, user 등*/}) => ({
		title: write.title,
		body: write.body,
	}));
	
	const onChangeField = useCallback(payload => {
		dispatch(changeField(payload))
	}, [dispatch]);

	// 언마운트될 때 초기화
	useEffect(() => {
		// 초기화
		return () => {
			dispatch(initialize());
		};
	}, [dispatch]);

	return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
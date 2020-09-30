import React, { useState } from 'react';
import { Button, Container, Divider, Header, Image, Modal } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { api } from '../api'
import { useFetch } from '../helpers'
import { Link, navigate } from '@reach/router'
import { authAxios } from '../services/authentication.service';

const DeleteModal = ({ title, postSlug, thumbnail }) => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSubmit() {
        setLoading(true)
        authAxios
            .delete(api.posts.delete(postSlug))
            .then(res => {
                setLoading(false)
                navigate('/')
            })
            .catch(err => {
                setError(err.message || err)
                setLoading(false)
            })
    }

    const [open, toggle] = useState(false)
    return (
        <Modal
            onClose={() => toggle(false)}
            open={open}
            trigger={<button className="btn-delete btn" onClick={() => toggle(true)} >Delete Post</button>}
        >
            <Modal.Header>
                Delete post
            </Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={thumbnail} wrapped />
                <Modal.Description>
                    <Header>{title}</Header>
                    {error && <Message negative message={error} />}

                    <p>
                        Are you sure you want to delete this post
                    </p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggle(false)}>
                    No
            </Button>
                <Button
                    content="Confirm delete"
                    labelPosition="right"
                    icon='checkmark'
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
                    negative
                />
            </Modal.Actions>
        </Modal>
    )
}

const Blockquote = (props) => {
    console.log(props)
    return (
        <Message className="block-quote" message={props.value ? props.value : props.children} />
    )
}

const Code = (props) => {
    console.log(props)
    return (
        <Code className="code-blocks">
        {props.value ? props.value : props.children}
        </Code>
    )
}

const Renderers = {
    blockquote: Blockquote,
    code: Code
}

const PostDetail = (props) => {
    const { data, loading, error } = useFetch(api.posts.retrieve(props.postSlug)) // Custom hook
    return (
        <Container className="detail-container" text>
            {error && <Message negative message={error} />}
            {loading && <Loader />}
            {data && (
                <div>
                    <Image className="detail-img" src={data.thumbnail} />
                    <h1 className="detail-header">{data.title}</h1>
                    <h6 className="detail-date"> Last updated at {`${new Date(data.updated_at).toLocaleDateString()}`}</h6>
                        <ReactMarkdown className="detail-content" source={data.content} renderers={Renderers} />
                        <Divider />
                        {data.is_author && (
                            <>
                                <Link to={`/posts/${props.postSlug}/update`}>
                                    <button className="btn-update btn">
                                        Update
                        </button>
                                </Link>
                                <DeleteModal postSlug={props.postSlug} title={data.title} thumbnail={data.thumbnail} />
                            </>
                        )}
                    
                </div>
            )}
        </Container>
    )
}

export default PostDetail;

import React from 'react';
import { Link } from '@reach/router'
import { Item, Divider } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { api } from '../api'
import { useFetch } from '../helpers'

const PostList = () => {

    const { data, loading, error } = useFetch(api.posts.list) // Custom hook

    return (
        <div>
            <Header className="text-white">New entries</Header>
            <Divider />
            {error && <Message negative message={error} />}
            {loading && <Loader />}
            <Item.Group>
                {data?.map(post => {
                    return (
                        <div className="blocks p-1 my-3">
                            <Item className="d-flex" key={post.user}>
                                <Item.Image className="mr-3" size='small' src={post.thumbnail} />
                                <Item.Content>
                                    <Link className="text-white" to={`/posts/${post.slug}`}>
                                        <Item.Header as='h3'>{post.title}</Item.Header>
                                    </Link>
                                    <small>{post.user} - </small>
                                    <small>{post.description}</small>
                                </Item.Content>
                            </Item>
                        </div>
                    )
                })}
            </Item.Group>
        </div>
    );
}

export default PostList;


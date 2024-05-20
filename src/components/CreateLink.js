import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
    mutation PostMutation(
        $answer: String!
        $link: String!
    ) {
        createLink(answer: $answer, link: $link) {
            id
            answer
            link
        }
    }
`;

const CreateLink = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        answer: '',
        link: ''
    });

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            answer: formState.answer,
            link: formState.link
        },
        onCompleted: () => navigate('/')
    });

    

    return (
        <div>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                createLink();
            }}
        >
            <div className="flex flex-column mt3">
            <input
                className="mb2"
                value={formState.answer}
                onChange={(e) =>
                setFormState({
                    ...formState,
                    answer: e.target.value
                })
                }
                type="text"
                placeholder="Answer (yes or no)"
            />
            <input
                className="mb2"
                value={formState.link}
                onChange={(e) =>
                setFormState({
                    ...formState,
                    link: e.target.value
                })
                }
                type="text"
                placeholder="The gif link"
            />
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default CreateLink;
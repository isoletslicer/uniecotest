import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Card } from 'semantic-ui-react';
import { server } from '../../config';

const User = ({ user }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteUser();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteUser = async () => {
        const userId = router.query.id;
        try {

            const deleted = await fetch(`${server}/api/users/${userId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="user-container">
            <Card>
                <Card.Content>
                    <Card.Header>
                        Full Name : {user.firstName} {user.lastName}
                    </Card.Header>
                    <Card.Meta>
                        Email : {user.email}
                    </Card.Meta>
                    <Card.Description>
                        Gender : {user.gender}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Card.Description>
                        Address :
                        <span className="text-decoration-through">
                            {user.addr.length !== 0 ? (
                                <ul>
                                    {user.addr.map((item, idx) => {
                                        return <li key={idx}>{item.street} {item.house} {item.city} {item.country}</li>;
                                    })}
                                </ul>
                            ) : (
                                <ul>
                                    <li>No Address found....</li>
                                </ul>
                            )}
                        </span>
                        {isDeleting
                            ? <Loader active />
                            :
                            <>
                                <h1>{user.title}</h1>
                                <p>{user.description}</p>
                                <Button color='red' onClick={open}>Delete</Button>
                            </>
                        }
                        <Confirm
                            open={confirm}
                            onCancel={close}
                            onConfirm={handleDelete}
                        />
                    </Card.Description>
                </Card.Content>
            </Card>
            <br />

        </div>
    )
}

User.getInitialProps = async ({ query: { id } }) => {

    const res = await fetch(`${server}/api/users/${id}`);
    const { data } = await res.json();

    return { user: data }
}

export default User;
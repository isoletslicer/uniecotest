import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { server } from '../config';
import SortableTable from '../components/SortableTable';

const Index = ({ users }) => {
  return (
    <div className="users-container">
      <h1>Daftar Orang</h1>
      <hr />
      <p>*click the table head button to sort </p>
      <SortableTable users={users} />
    </div>
  )
}

Index.getInitialProps = async () => {

  const res = await fetch(`${server}/api/users`);
  const { data } = await res.json();

  return { users: data }
}

export default Index;
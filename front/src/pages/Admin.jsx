import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPastriesQuery, useDeletePastryMutation } from '../features/pastry';
import { useSelector } from 'react-redux';

function Admin() {
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const { data: pastries, error, isLoading, refetch } = useGetPastriesQuery();
  const [deletePastry, { isLoading: isDeleting, isSuccess }] = useDeletePastryMutation();
  const {isLoggedIn} = useSelector(s => s.auth);
  
  useEffect(() => {
      // const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn !== true) {
          navigate('/login');
      }
  }, [navigate]);

  useEffect(() => {
      if (isSuccess) {
          refetch();  // Refetch the pastries list after a pastry is deleted
      }
  }, [isSuccess, refetch]);

  const handleDelete = async (id) => {
    await deletePastry(id);
};

  return (
    <div>
      <h1>Admin - Pastries Management</h1>
      <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Image</th>
                <th>Stock</th>
                <th>Quantité gagnée</th>
                <th>Modifier</th>
                <th>Supprimer</th>
            </tr>
        </thead>
        <tbody>
        {pastries?.map(pastry => (
          <tr key={pastry.id}>
            <td>{pastry.id}</td>
            <td>{pastry.name}</td>
            <td><img className='mini' src={pastry.image} alt={pastry.name} /></td>
            <td>{pastry.quantity}</td>
            <td>{pastry.quantityWon}</td>
            <td><button>Modifier</button></td>
            <td><button onClick={() => handleDelete(pastry.id)} disabled={isDeleting}>X</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;

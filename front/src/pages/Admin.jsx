import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGetPastriesQuery, useDeletePastryMutation, useCreatePastryMutation, useUpdatePastryMutation } from '../features/pastry';

function Admin() {
  const { data: pastries, error, isLoading, refetch } = useGetPastriesQuery();
  const [deletePastry, { isLoading: isDeleting, isSuccess: isDeletingSuccess }] = useDeletePastryMutation();
  const [createPastry, { isLoading: isCreating, isSuccess: createSuccess }] = useCreatePastryMutation();
  const [updatePastry] = useUpdatePastryMutation(); // Assuming this mutation exists
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newStock, setNewStock] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', image: '', stock: 0 });

  const navigate = useNavigate();

  useEffect(() => {
      if (isDeletingSuccess || createSuccess) {
          refetch();  // Refetch the pastries list after a pastry is deleted
      }
  }, [isDeletingSuccess, createSuccess, refetch]);

  const handleDelete = async (id) => {
    await deletePastry(id);
  };

  const handleAdd = async () => {
    const newPastry = {
      name: newName,
      image: newImage,
      quantity: newStock,
      quantityWon: 0,
      choice: false,
    };
    await createPastry(newPastry);  // Send new pastry data to the backend
    setNewName('');
    setNewImage('');
    setNewStock(0);
  };

  const handleEdit = (pastry) => {
    setEditingId(pastry.id);
    setEditFormData({ name: pastry.name, image: pastry.image, stock: pastry.quantity });
  };

  const handleSave = async () => {
    const updatedPastry = {
      id: editingId,
      name: editFormData.name,
      image: editFormData.image,
      quantity: editFormData.stock,
      quantityWon : 0
    };
    await updatePastry({ id: editingId, data: updatedPastry });
    setEditingId(null);
    refetch();
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  if (!pastries){
    navigate('/login');
  return;
  }
    

  return (
    <>
      <h1>Dashboard</h1>
      <section>
        <h3>Ajouter une pâtisserie</h3>
        <table>
          <thead>
              <tr>
                  <th>Id</th>
                  <th>Nom</th>
                  <th>Image</th>
                  <th>Stock</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pastries.length > 0 ? +pastries[pastries.length - 1].id + 1 : 1}</td>
              <td><input placeholder='nom' value={newName} onChange={(e) => setNewName(e.target.value)} /></td>
              <td><input placeholder='image' value={newImage} onChange={(e) => setNewImage(e.target.value)} /></td>
              <td><input type="number" placeholder='stock' value={newStock} onChange={(e) => setNewStock(parseInt(e.target.value) || 0)} /></td>
              <td><button onClick={handleAdd}>Ajouter</button></td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h3>Mes pâtisseries</h3>
        <div>
          <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Image</th>
                    <th>Stock</th>
                    <th>Quantité gagnée</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {pastries.map((pastry) => (
              <tr key={pastry.id}>
                <td>{pastry.id}</td>
                <td>{editingId === pastry.id ? <input value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} /> : pastry.name}</td>
                <td>{editingId === pastry.id ? <input value={editFormData.image} onChange={(e) => setEditFormData({...editFormData, image: e.target.value})} /> : <img className='mini' src={pastry.image} alt={pastry.name} />}</td>
                <td>{editingId === pastry.id ? <input type="number" value={editFormData.stock} onChange={(e) => setEditFormData({...editFormData, stock: parseInt(e.target.value) || 0})} /> : pastry.quantity}</td>
                <td>{pastry.quantityWon}</td>
                <td>
                  {editingId === pastry.id ? (
                    <>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(pastry)}>Modifier</button>
                      <button onClick={() => handleDelete(pastry.id)} disabled={isDeleting}>X</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Admin;

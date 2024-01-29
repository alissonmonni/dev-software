import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Table = styled.table`
   width: 100%;
   background-color: #fff;
   padding: 20px;
   box-shadow: 0px 0px 5px #ccc;
   border-radius: 5px;
   max-width: 1200px;
   margin: 20px auto;
   word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
   text-align: start;
   border-bottom: inset;
   padding-bottom: 5px;

   @media (max-width: 500px) {
      ${(props) => props.onlyweb && "display: none;"}
   }
`;

export const Td = styled.td`
   padding-top: 15px;
   text-align: ${(props) => (props.alignCenter ? "center" : "start")};
   width: ${(props) => (props.width ? props.width : "auto")};

   @media (max-width: 500px) {
      ${(props) => props.onlyweb && "display: none;"}
   }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
   const handleEdit = (item) => {
      setOnEdit(item);
   };

   const handleDelete = async (tar_id) => {
      await axios
         .delete("http://localhost:8800/" + tar_id)
         .then(({ data }) => {
            const newArray = users.filter((user) => user.tar_id !== tar_id);
            setUsers(newArray);
            toast.success(data);
         })
         .catch(({ data }) => toast.error(data));

      setOnEdit(null);
   };

   const formatDate = (dateString) => {
      const dateObj = new Date(dateString);
      const dia = dateObj.getDate();
      const mes = dateObj.getMonth() + 1;
      const ano = dateObj.getFullYear();
      return `${dia}/${mes}/${ano}`;
   };

   return (
      <Table>
         <Thead>
            <Tr>
               <Th>Responsável</Th>
               <Th>Tarefa</Th>
               <Th>Data Final</Th>
               <Th></Th>
               <Th></Th>
            </Tr>
         </Thead>
         <Tbody>
            {users.map((item, i) => (
               <Tr key={i}>
                  <Td width="30%">{item.tar_resp}</Td>
                  <Td width="30%">{item.tar_tarefa}</Td>
                  <Td width="20%">{formatDate(item.tar_datafinal)}</Td>
                  <Td alignCenter width="5%">
                     <FaEdit onClick={() => handleEdit(item)} />
                  </Td>
                  <Td alignCenter width="5%">
                     <FaTrash onClick={() => handleDelete(item.tar_id)} />
                  </Td>
               </Tr>
            ))}
         </Tbody>
      </Table>
   );
};

export default Grid;

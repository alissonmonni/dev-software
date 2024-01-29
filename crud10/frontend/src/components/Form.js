import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  width: 600px;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`; //topo testar ccc no lugar de bbb

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;//nome das caixas

const Input = styled.input`
  width: 145px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 25px;
`;//caixas

const Label = styled.label``;

const Button = styled.button`
  padding: 6px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 30px;
`;//botao salvar

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.tar_resp.value = onEdit.tar_resp;
      user.tar_tarefa.value = onEdit.tar_tarefa;
      user.tar_datafinal.value = onEdit.tar_datafinal;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.tar_resp.value ||
      !user.tar_tarefa.value ||
      !user.tar_datafinal.value
    ) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.tar_id, {
          tar_resp: user.tar_resp.value,
          tar_tarefa: user.tar_tarefa.value,
          tar_datafinal: user.tar_datafinal.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          tar_resp: user.tar_resp.value,
          tar_tarefa: user.tar_tarefa.value,
          tar_datafinal: user.tar_datafinal.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.tar_resp.value = "";
    user.tar_tarefa.value = "";
    user.tar_datafinal.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Responsável</Label>
        <Input name="tar_resp" />
      </InputArea>
      <InputArea>
        <Label>Tarefa</Label>
        <Input name="tar_tarefa" />
      </InputArea>
      <InputArea>
        <Label>Data de finalização</Label>
        <Input name="tar_datafinal" type="date" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;

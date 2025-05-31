import { useEffect, useState } from 'react';
import styles from './TodoApp.module.css'

function TodoApp() {
    const [tarefa, setTarefa] = useState("");
    const [lista, setLista] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [textoEditado, setTextoEditado] = useState("");

    useEffect(() =>{
        const tarefasSalvas = localStorage.getItem('tarefas');
        if (tarefasSalvas) {
            try {
                setLista(JSON.parse(tarefasSalvas));
            } catch (e) {
                console.error("Erro ao fazer parse das tarefas:", e);
                localStorage.removeItem("tarefas");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(lista));
    }, [lista]);

    function adicionarTarefa() {
        if (tarefa.trim() === "") return;

        const novaTarefa = {
            id: Date.now(),
            texto: tarefa
        };

        setLista([...lista, novaTarefa]);
        setTarefa("");
    }

    function removerTarefa(id) {
        setLista(lista.filter((tarefa) => tarefa.id !== id));
    }

    function iniciarEdicao(id, textoAtual) {
        setEditandoId(id);
        setTextoEditado(textoAtual);
    }

    function salvarEdicao(id) {
        setLista(
            lista.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, texto: textoEditado } : tarefa
            )
        );
        setEditandoId(null);
        setTextoEditado("");
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Gerenciamento de Tarefas ({lista.length})</h2>
            <div className={styles.inputGroup}>
                <input
                    type='text'
                    value={tarefa}
                    onChange={(e) => setTarefa(e.target.value)}
                    placeholder='Digite a tarefa'
                    className={styles.input}
                />
                <button onClick={adicionarTarefa} className={styles.adicionarBtn}>
                    Adicionar
                </button>
            </div>
            <ul className={styles.lista}>
                {lista.map((tarefa) => (
                    <li key={tarefa.id} className={styles.item}>
                        {editandoId === tarefa.id ? (
                            <>
                                <input
                                    type="text"
                                    value={textoEditado}
                                    onChange={(e) => setTextoEditado(e.target.value)}
                                    className={styles.input}
                                />
                                <button
                                    onClick={() => salvarEdicao(tarefa.id)}
                                    className={styles.salvarBtn}
                                >
                                    Salvar
                                </button>
                            </>
                        ) : (
                            <>
                                <span className={styles.texto}>{tarefa.texto}</span>
                                <div className={styles.botoes}>
                                    <button
                                        onClick={() => iniciarEdicao(tarefa.id, tarefa.texto)}
                                        className={styles.editarBtn}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => removerTarefa(tarefa.id)}
                                        className={styles.removerBtn}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
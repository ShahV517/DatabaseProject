import styles from './Table.module.css';

const Table = ({ table }) => {
    return (
        <table>
            <tr key={"header"}>
                {Object.keys(table[0]).map((key) => (
                    <th>
                        {key}
                    </th>
                ))}
            </tr>
            {table.map((row) => (
                <tr key={row.id}>
                    {Object.keys(row).map((key) => (
                        <td>
                            {row[key]}
                        </td>
                    ))}
                </tr>
            ))}
        </table>
    );
}

export default Table;
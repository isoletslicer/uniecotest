import React from 'react';
import Link from 'next/link';
import { Table, Button } from 'semantic-ui-react'


const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

export default function SortableTable(props) {
    const { items, requestSort, sortConfig } = useSortableData(props.users);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <Table celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <Button color='olive' onClick={() => requestSort('firstName')} className={getClassNamesFor('firstName')}>Name</Button>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <Button color='grey' onClick={() => requestSort('gender')} className={getClassNamesFor('gender')}>Gender</Button>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <Button color='teal' onClick={() => requestSort('addr')} className={getClassNamesFor('addr')}>Address</Button>
                    </Table.HeaderCell>
                    <Table.HeaderCell> Action </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {items.map((item) => (
                    <Table.Row key={item._id}>
                        <Table.Cell>{item.firstName} {item.lastName}</Table.Cell>
                        <Table.Cell>{item.gender}</Table.Cell>
                        <Table.Cell>{item.addr.map((item) => { return `${item.street} ${item.house}, ${item.city}-${item.country} |  ` })}</Table.Cell>
                        <Table.Cell><Link href={`/${item._id}`}>
                            <Button color='violet'>View Card Mode</Button>
                        </Link>
                            <Link href={`/${item._id}/edit`}>
                                <Button color='olive'>Edit</Button>
                            </Link></Table.Cell>
                    </Table.Row>
                ))}

            </Table.Body>
        </Table >
    );
};
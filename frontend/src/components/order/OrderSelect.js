import React from 'react';
import Select from 'react-select';


const OrderSelect = ({ items, data, setData, disabled }) => {
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        mapSelect().forEach((item) => {
            if (item?.value === data) {
                setCurrent(item);
            }
        });
    }, [items]);

    const mapSelect = () => {
        const mapped = items?.map((item) => ({
            label: item?.name,
            value: item?.id,
        }));
        return mapped;
    };

    const handleChange = (element) => {
        setCurrent(element);
        setData(parseInt(element.value));
    };

    return (
        <Select
            options={mapSelect()}
            onChange={handleChange}
            value={current}
            placeholder="Selectionner une valeur"
            isDisabled={disabled}
            isSearchable
        />
    );
}
export default OrderSelect
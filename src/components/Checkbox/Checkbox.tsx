import './Checkbox.css'

interface Props {
    name: string,
    value: any,
    updateField: (name: string, value: any) => void,
    description?: string,
    required: boolean,
    label: string
}

const Checkbox: React.FC<Props> = (props) => {
    return (
        <div className="checkbox-label">
            <p>{props.description}</p>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={props.value || false}
                    name={props.name}
                    onChange={e => props.updateField(props.name, !props.value)}
                    required={props.required}
                />
                <div className="checkbox-alignment">{props.label}</div>
                {
                    props.required &&
                        <div 
                            style={{
                                position: 'absolute', 
                                top: 0, 
                                right: '10px', 
                                color: 'red', 
                                fontSize: '10px'
                            }}
                            >
                                *required
                        </div>
                }
            </div>
        </div>
    )
}

export default Checkbox
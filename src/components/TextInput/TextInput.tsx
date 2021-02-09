import './TextInput.css'

interface Props {
    name: string,
    value: string,
    updateField: (name: string, value: string) => void,
    description?: string
}

const TextInput: React.FC<Props> = (props) => {

    //if name is comprised of multiple words separated by underscores, label formatted for reading
    const splits = props.name.split('_').join(' ');

    return (
        <label className="ti-label">
            <div style={{textAlign: 'left', width: '100%'}}>{splits[0].toUpperCase() + splits.slice(1).toLowerCase()}: </div>
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
            <p
                className='ti-description'
                >{props.description}</p>
            <input
                type="text"
                className="ti-input"
                name={props.name} 
                value={props.value || ''}
                onChange={(e) => props.updateField(props.name, e.target.value)}
                required
                />
        </label>
    )
}

export default TextInput
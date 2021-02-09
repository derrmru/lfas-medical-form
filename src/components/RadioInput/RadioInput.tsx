import './RadioInput.css'

interface Props {
    name: string,
    value: string,
    updateField: (name: string, value: string) => void,
    fields: {[index: string]: string},
    options: string[]
}

const RadioInput: React.FC<Props> = (props) => {

    //if name is comprised of multiple words separated by underscores, label formatted for reading
    const splits = props.name.split('_').join(' ');

    return (
        <label className="ri-label">
            {splits[0].toUpperCase() + splits.slice(1).toLowerCase()}: <br /><br />
            <div className="radio-container">
                {
                    props.options.map((option, i) => {
                        return <label key={'option' + i}>
                            {option[0].toUpperCase() + option.slice(1).toLowerCase()}:
                            <input 
                                type="radio" 
                                name={option} 
                                checked={props.fields[props.name] === option} 
                                value={option}
                                onChange={(e) => props.updateField(props.name, e.target.value)} 
                                />
                        </label>
                    })
                }
            </div>
        </label>
    )
}

export default RadioInput
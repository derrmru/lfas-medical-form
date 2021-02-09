import TextInput from '../TextInput/TextInput'
import RadioInput from '../RadioInput/RadioInput'
import DateInput from '../DateInput/DateInput'
import './Medical.css'

interface Props {
    setStage: (stage: string) => void,
    setFields: (fields: any) => void,
    fields: {[index: string]: string}
}

const Medical: React.FC<Props> = ({setStage, setFields, fields}) => {
    const updateField = (name: string, value: string) => {
        const temp = {...fields}
        temp[name] = value;
        setFields(temp)
    }

    const next = (e: any) => {
        e.preventDefault()
        setStage('submission')
    }

    return (
        <form className="medical-form" onSubmit={(e) => next(e)}>
            <TextInput 
                name='full_name'
                value={fields.full_name}
                updateField={(name: string, value: string) => updateField(name, value)}
                />
            <DateInput 
                name='date_of_birth'
                value={fields.date_of_birth}
                updateField={(name: string, value: string) => updateField(name, value)}
                />
            <TextInput 
                name='conditions'
                value={fields.conditions}
                updateField={(name: string, value: string) => updateField(name, value)}
                description='Please list any previous or existing medical conditions.'
                />
            <TextInput 
                name='medicines'
                value={fields.medicines}
                updateField={(name: string, value: string) => updateField(name, value)}
                description='Please list any medications you are currently taking.'
                />
            <TextInput 
                name='operations'
                value={fields.operations}
                updateField={(name: string, value: string) => updateField(name, value)}
                description='Please list any previous surgical procedures you have undergone.'
                />
            <TextInput 
                name='allergies'
                value={fields.allergies}
                updateField={(name: string, value: string) => updateField(name, value)}
                />
            <TextInput 
                name='occupation'
                value={fields.occupation}
                updateField={(name: string, value: string) => updateField(name, value)}
                />
            <RadioInput 
                name='do_you_smoke'
                value={fields.do_you_smoke}
                updateField={(name: string, value: string) => updateField(name, value)}
                fields={fields}
                options={['smoker', 'non-smoker']}
                />
            {/*if smoking field is selected, extra field for how many per day*****************/
                fields.do_you_smoke === 'smoker' &&
                <>
                    <hr />
                    <TextInput 
                        name='how_many_per_day'
                        value={fields.how_many_per_day}
                        updateField={(name: string, value: string) => updateField(name, value)}
                        />
                    <hr />
                </>
            }
            <TextInput 
                name='alcohol_consumption'
                value={fields.alcohol_consumption}
                updateField={(name: string, value: string) => updateField(name, value)}
                description='Units of alcohol per week.'
                />
            <TextInput 
                name='height'
                value={fields.height}
                updateField={(name: string, value: string) => updateField(name, value)}
                description='Please specify unit of measurement, e.g. 1.8 metres'
                />
            <TextInput 
                name='weight'
                value={fields.weight}
                updateField={(name: string, value: string) => updateField(name, value)}
                description='Please specify unit of measurement, e.g. 70kg'
                />
            <TextInput 
                name='shoe_size'
                value={fields.shoe_size}
                updateField={(name: string, value: string) => updateField(name, value)}
                description='Please specify unit of measurement, e.g. 9 Adult UK'
                />
            <TextInput 
                name='sporting_activities'
                value={fields.sporting_activities}
                updateField={(name: string, value: string) => updateField(name, value)}
                description='Please list your current sporting or physical activities.'
                />
            <button
                className="mf-submit-buttons"
                type="submit"
                >
                    next
            </button>
        </form>
    )
}

export default Medical
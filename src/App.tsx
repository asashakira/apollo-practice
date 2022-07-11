import React from 'react'
import {useQuery, gql} from '@apollo/client'

const GET_LOCATIONS = gql`
    query GetLocations {
        locations {
            id
            name
            description
            photo
        }
    }
`

const GET_DOGS = gql`
    query GetDogs {
        dogs {
            id
            breed
        }
    }
`

const DisplayLocations = () => {
    const {loading, error, data} = useQuery(GET_LOCATIONS)
    
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    return data.locations.map(({id, name, description, photo}) => (
        <div key={id}>
            <h3>{name}</h3>
            <img width="400" height="250" src={`${photo}`} />
            <br />
            <b>About this Location</b>
            <p>{description}</p>
            <br />
        </div>
    ))
}

const Dogs = ({onDogSelected}) => {
    const {loading, error, data} = useQuery(GET_DOGS)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    return (
        <select name="dog" onChange={onDogSelected}>
            {data.dogs.map((dog: Record<string, string | number>) => (
                <option key={dog.id} value={dog.breed}>
                    {dog.breed}
                </option>
            ))}
        </select>
    )
}

const GET_DOG_PHOTO = gql`
    query Dog($breed: String!) {
        dog(breed: $breed) {
            id
            displayImage
        }
    }
`

const DogPhoto = ({breed}) => {
    const {loading, error, data} = useQuery(GET_DOG_PHOTO, {
        variables: {breed},
    })


    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    return (
        <img src={data.dog.displayImage} style={{height: 100, width: 100}} />
    )
}

export const App = () => {
    const [dog, setDog] = React.useState('')
    const handleDogSelected = React.useCallback((newDog: string) => {
        setDog(newDog)
    }, [])

    return (
        // <DisplayLocations />
        <div>
            <Dogs onDogSelected={handleDogSelected} />
            <DogPhoto breed={dog} />
        </div>
    )
}

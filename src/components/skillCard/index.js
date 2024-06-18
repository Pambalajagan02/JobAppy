import './index.css'

const SkillCard = props => {
  const {item} = props
  const {imageUrl, name} = item
  return (
    <li className="list-sikll-con">
      <img src={imageUrl} alt={name} className="img-style-skil" />
      <p className="name-skill">{name}</p>
    </li>
  )
}
export default SkillCard

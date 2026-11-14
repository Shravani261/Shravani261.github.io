import { Link } from 'react-router-dom'
import BrowserWindow from './BrowserWindow'

export default function EducationPreview() {
  return (
    <BrowserWindow className="pv" label="Education preview">
      <div className="pvb">
        <div>
          <h2>Education</h2>
          <p>
            Academic achievements, strong foundations
            and continuous learning in Data & AI.
          </p>
          <Link to="/education" className="btn sm">
  Know More →
</Link>
        </div>

        <div className="trail">
         
        </div>
      </div>
    </BrowserWindow>
  )
}
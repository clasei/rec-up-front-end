import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import service from "../../services/config"

function RecommendationDetailPage() {
  const { recommendationId } = useParams()
  const [recommendation, setRecommendation] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {
    const fetchRecommendationDetails = async () => {
      try {
        const response = await service.get(`/recommendations/${recommendationId}`)
        setRecommendation(response.data)
      } catch (error) {
        setErrorMessage("Failed to fetch recommendation details.")
      }
    };

    fetchRecommendationDetails()
  }, [recommendationId])

  if (!recommendation) {
    return <p>Loading recommendation...</p>
  }


  return (
    // <div className="container my-5">
    //   {errorMessage && <p className="text-danger">{errorMessage}</p>}
    //   <div className="row justify-content-center">
    //     <div className="col-md-8">
    //       <div className="card shadow-sm">
    //         <div className="card-body">
    //           <h2 className="card-title text-center">{recommendation.content.title}</h2>
    //           <p className="text-muted text-center">By: {recommendation.creator.username}</p>

    //           <hr />

    //           <h4>{recommendation.recTitle}</h4>
    //           <p className="text-muted"><em>{recommendation.tagline}</em></p>
              
    //           <p>{recommendation.recText}</p>

    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="container my-5">
  {errorMessage && <p className="text-danger">{errorMessage}</p>}
  <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="card shadow-sm">
        <div className="card-body">


          <h2 className="card-title text-center">{recommendation.content.title}</h2>
          <p className="text-muted text-center">By: {recommendation.creator.username}</p>

          <hr />

          {/* IMAGE OR VIDEO FORMATS BELOW -- user should know... */}
          {recommendation.content.mediaUrl && (
            <div className="text-center mb-4">
              {recommendation.content.mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <img
                  src={recommendation.content.mediaUrl}
                  alt="content media"
                  className="img-fluid"
                />
              ) : recommendation.content.mediaUrl.match(/\.(mp4|webm|ogg)$/) ? (
                <video controls className="img-fluid">
                  <source src={recommendation.content.mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <a href={recommendation.content.mediaUrl} target="_blank" rel="noopener noreferrer">
                  View Media
                </a>
              )}
            </div>
          )}

          <h4>{recommendation.recTitle}</h4>
          <p className="text-muted"><em>{recommendation.tagline}</em></p>
          <p>{recommendation.recText}</p>
          
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default RecommendationDetailPage;

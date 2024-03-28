import { Button, FrameContext } from 'frog'
import { Env } from 'hono/types'

import { backgroundStyles } from '../styles'
import { getCampaign } from '../crowdfi'
import { errorScreen } from './error'

export const homeScreen = async (c: FrameContext<Env, '/:campaignId'>) => {
  const { campaignId } = c.req.param()

  const campaign = await getCampaign(campaignId)
  if (!campaign) return errorScreen(c)

  return c.res({
    image: (
      campaign.metadata.photo_urls[0] ? 
      <div
        style={{
          ...backgroundStyles,
          backgroundImage: `url(${campaign.metadata.photo_urls[0]})`,
        }}
      /> : 
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', height: '100%' }}>
        <h1>{campaign.metadata.title}</h1>
        <p>by <span>{campaign.creator.ens_name ?? campaign.creator.name}</span></p>
      </div>
    ),
    intents: [
      <Button action={`/campaign/${campaignId}/contribute`}>
        View Campaign
      </Button>,
    ],
  })
}

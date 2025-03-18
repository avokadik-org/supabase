import { cn } from 'ui'
import { useThreeJS } from './helpers'
import { useCallback, useEffect, useRef, useState } from 'react'
import SceneRenderer, { BaseScene } from './utils/SceneRenderer'
import TicketScene from './scenes/TicketScene'
import TunnelScene from './scenes/TunnelScene'
import useConfData from './hooks/use-conf-data'

interface TicketCanvasProps {
  className?: string
}

const TicketCanvas = ({
  className,
}: TicketCanvasProps) => {
  const sceneRef = useRef<TicketScene | null>(null)
  const tunnelRef = useRef<TunnelScene | null>(null)
  const initQueue = useRef<{ init: Promise<void>; renderer: SceneRenderer }[]>([])
  const [state, dispatch] = useConfData()
  const initialSceneDataRef = useRef({
    visible: state.ticketVisibility,
    secret: state.userTicketData.secret,
    platinum: state.userTicketData.platinum,
    user: {
      id: state.userTicketData.id,
      name: state.userTicketData.name,
      ticketNumber: state.userTicketData.ticket_number,
    },
  })

  const setup = useCallback(
    (container: HTMLElement) => {
      const uuid = Math.random().toString(36).substring(7)

      const sceneRenderer = new SceneRenderer(container, initQueue.current, uuid)

      const initPromise = sceneRenderer.init(async () => {
        dispatch({ type: 'TICKET_LOADING_START' })
        const scene = new TicketScene({
          defaultVisible: initialSceneDataRef.current.visible,
          defaultSecret: initialSceneDataRef.current.secret,
          defaultPlatinum: initialSceneDataRef.current.platinum,
          user: initialSceneDataRef.current.user,
          onSeatChartButtonClicked: () => {
            scene.showBackSide()
            scene.upgradeToSecret()
          },
          onGoBackButtonClicked: () => {
            scene.showFrontSide()
          },
        })

        const tunnel = new TunnelScene({
          defaultVisible: true,
        })
        await sceneRenderer.activateScene(scene, true)
        await sceneRenderer.activateScene(tunnel)
        sceneRef.current = scene
        tunnelRef.current = tunnel
        dispatch({ type: 'TICKET_LOADING_SUCCESS' })
      })

      initQueue.current.push({ init: initPromise, renderer: sceneRenderer })

      return sceneRenderer
    },
    [dispatch]
  )

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setVisible(state.ticketVisibility)
      sceneRef.current.setTicketNumber(state.userTicketData.ticket_number ?? 0)
      sceneRef.current.setUserName(state.userTicketData.name ?? '')
      sceneRef.current.reloadTextures()
    }
  }, [state.ticketVisibility, state.userTicketData.name, state.userTicketData.ticket_number])

  const { containerRef } = useThreeJS(setup)
  return (
    <div
      className={cn(
        'absolute inset-0 flex justify-center items-center overflow-hidden w-full h-full',
        className
      )}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        onClick={(e) => {
          sceneRef.current?.click(e.nativeEvent)
        }}
      />
    </div>
  )
}

export default TicketCanvas

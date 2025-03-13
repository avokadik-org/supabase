import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { loadGLTFModel } from '../helpers'
import SceneRenderer, { BaseScene } from '../utils/SceneRenderer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { Camera, Euler, MathUtils, Scene, Vector3 } from 'three'

interface TicketSceneState {
  secret: boolean
  platinum: boolean
  frontside: boolean
  startDate: Date
  ticketNumber: number
  texts: {
    username: string
    species: string
    earth: string
    seatCode: string
  }
}

interface TicketSceneOptions {
  defaultSecret?: boolean
  defaultPlatinum?: boolean
  startDate: Date
  user: {
    id?: string
    name?: string
    ticketNumber?: number
  }
  onUpgradeToSecret?: () => {}
}

interface MousePositionState {
  clientX: number
  clientY: number
  isWithinContainer: boolean
  containerX: number
  containerY: number
}

class TicketScene implements BaseScene {
  sceneUrl = '/images/launchweek/14/ticket-model.glb'
  staticBasicTexture = '/images/launchweek/14/basic-static-ticket.png'
  staticSecretTexture = '/images/launchweek/14/secret-static-ticket.png'
  staticPlatinumTexture = '/images/launchweek/14/platinum-static-ticket.png'
  fontUrl = ''

  state: TicketSceneState

  private _internalState = {
    mousePosition: undefined as MousePositionState | undefined,
    containerBBox: undefined as DOMRect | undefined,
  }

  private _sceneConfig = {
    camera: {
      position: new Vector3(0, 3, 0),
      rotation: new Euler(MathUtils.degToRad(-90), 0, 0),
    },
  }

  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null

  private _sceneRenderer: SceneRenderer | null = null

  constructor(private options: TicketSceneOptions) {
    this.state = {
      secret: options.defaultSecret || false,
      platinum: options.defaultPlatinum || false,
      frontside: true,
      startDate: options.startDate,
      ticketNumber: options.user.ticketNumber || 0,
      texts: {
        username: options.user.name || '',
        species: '',
        earth: '',
        // Start asigning seats from A001
        seatCode: (466561 + (options.user.ticketNumber || 0)).toString(36),
      },
    }
  }

  async setup(context: SceneRenderer): Promise<void> {
    this._sceneRenderer = context
    this._internalState.containerBBox = context.container.getBoundingClientRect()

    const gltf = await loadGLTFModel(this.sceneUrl)

    const ticket = gltf.scene as unknown as Scene

    this._setCamera(context.camera)
    const modelRenderPass = new RenderPass(ticket, context.camera)
    context.composer.addPass(modelRenderPass)

    // Set renderer clear color to make background visible
    context.renderer.setClearColor(0x000000, 0)

    // Add ambient light with increased intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    ticket.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(5, 5, 5)
    ticket.add(directionalLight)

    // Add a point light to better illuminate the placeholder
    const pointLight = new THREE.PointLight(0xffffff, 1.0)
    pointLight.position.set(0, 0, 5)
    ticket.add(pointLight)
    this._applyMouseFollowEffect(context)
  }

  update(context: SceneRenderer, dt?: number): void {
    const ticket = context.composer.passes[0] as RenderPass
    if (ticket && ticket.scene) {
      // Calculate rotation based on mouse position
      // Limit rotation to reasonable angles
      if (this._internalState.mousePosition?.isWithinContainer) {
        const mouseX = this._internalState.mousePosition.containerX
        const mouseY = this._internalState.mousePosition.containerY
        const targetRotationX = mouseY * -0.2
        const targetRotationZ = mouseX * -0.3

        // Apply smooth rotation
        ticket.scene.rotation.x = MathUtils.lerp(
          ticket.scene.rotation.x,
          targetRotationX,
          dt ?? 0.1
        )
        ticket.scene.rotation.z = MathUtils.lerp(
          ticket.scene.rotation.z,
          targetRotationZ,
          dt ?? 0.1
        )
      } else {
        ticket.scene.rotation.x = MathUtils.lerp(ticket.scene.rotation.x, 0, dt ?? 0.1)
        ticket.scene.rotation.z = MathUtils.lerp(ticket.scene.rotation.z, 0, dt ?? 0.1)
      }
    }
  }
  cleanup(): void {
    if (this.mouseMoveHandler) window.removeEventListener('mousemove', this.mouseMoveHandler)
  }

  handleEvent(event: string, data?: any): void {
    throw new Error('Method not implemented.')
  }

  resize(_ev: UIEvent): void {
    this._internalState.containerBBox = this._sceneRenderer?.container.getBoundingClientRect()
    return
  }

  showSecondFace(context: SceneRenderer) {
    const ticket = context?.composer.passes[0] as RenderPass
    if (ticket && ticket.scene) {
      // Toggle frontside state
      this.state.frontside = !this.state.frontside

      // Rotate to show back side (180 degrees around Y axis) or front side (0 degrees)
      const targetRotationY = this.state.frontside ? 0 : Math.PI

      // Animate the rotation

      // Smoothly interpolate current rotation to target rotation
      ticket.scene.rotation.y = MathUtils.lerp(ticket.scene.rotation.y, targetRotationY, 0.1)
    }
  }

  private _setCamera(camera: Camera) {
    camera.position.copy(this._sceneConfig.camera.position)
    camera.rotation.copy(this._sceneConfig.camera.rotation)
  }

  private _applyMouseFollowEffect(context: SceneRenderer) {
    this.mouseMoveHandler = this._updateMousePosition.bind(this)
    window.addEventListener('mousemove', this.mouseMoveHandler)
  }

  private _updateMousePosition(ev: MouseEvent) {
    if (!this._internalState.mousePosition) {
      this._internalState.mousePosition = {
        clientX: 0,
        clientY: 0,
        isWithinContainer: false,
        containerX: 0,
        containerY: 0,
      }
    } else {
      this._internalState.mousePosition.clientX = ev.clientX
      this._internalState.mousePosition.clientY = ev.clientY

      const rect = this._internalState.containerBBox
      if (!rect) {
        return
      }
      const isWithinContainer =
        ev.clientX >= rect.left &&
        ev.clientX <= rect.right &&
        ev.clientY >= rect.top &&
        ev.clientY <= rect.bottom

      this._internalState.mousePosition.isWithinContainer = isWithinContainer
      this._internalState.mousePosition.containerX = ((ev.clientX - rect.left) / rect.width) * 2 - 1
      this._internalState.mousePosition.containerY =
        -((ev.clientY - rect.top) / rect.height) * 2 + 1
    }
  }

  private createMaterial() {}
}

export default TicketScene

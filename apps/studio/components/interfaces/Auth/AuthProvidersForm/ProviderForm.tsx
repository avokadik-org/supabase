import { PermissionAction } from '@supabase/shared-types/out/constants'
// @ts-ignore
import { Check, ChevronUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { toast } from 'sonner'

import { useParams } from 'common'
import { ButtonTooltip } from 'components/ui/ButtonTooltip'
import { DocsButton } from 'components/ui/DocsButton'
import { ResourceItem } from 'components/ui/Resource/ResourceItem'
import type { components } from 'data/api'
import { useAuthConfigUpdateMutation } from 'data/auth/auth-config-update-mutation'
import { useProjectSettingsV2Query } from 'data/config/project-settings-v2-query'
import { useCustomDomainsQuery } from 'data/custom-domains/custom-domains-query'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { BASE_PATH } from 'lib/constants'
import {
  Alert_Shadcn_,
  AlertDescription_Shadcn_,
  AlertTitle_Shadcn_,
  Button,
  Form,
  Input,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  WarningIcon,
} from 'ui'
import type { Provider } from './AuthProvidersForm.types'
import FormField from './FormField'
import { Markdown } from 'components/interfaces/Markdown'
import { Admonition } from 'ui-patterns'

export interface ProviderFormProps {
  config: components['schemas']['GoTrueConfigResponse']
  provider: Provider
  isActive: boolean
}

const ProviderForm = ({ config, provider, isActive }: ProviderFormProps) => {
  const [open, setOpen] = useState(false)
  const { ref: projectRef, provider: urlProvider } = useParams()
  const { mutate: updateAuthConfig, isLoading: isUpdatingConfig } = useAuthConfigUpdateMutation()

  const doubleNegativeKeys = ['MAILER_AUTOCONFIRM', 'SMS_AUTOCONFIRM']
  const canUpdateConfig: boolean = useCheckPermissions(
    PermissionAction.UPDATE,
    'custom_config_gotrue'
  )

  const shouldDisableField = (field: string): boolean => {
    const shouldDisableSmsFields =
      config.HOOK_SEND_SMS_ENABLED &&
      field.startsWith('SMS_') &&
      ![
        'SMS_AUTOCONFIRM',
        'SMS_OTP_EXP',
        'SMS_OTP_LENGTH',
        'SMS_OTP_LENGTH',
        'SMS_TEMPLATE',
        'SMS_TEST_OTP',
        'SMS_TEST_OTP_VALID_UNTIL',
      ].includes(field)
    return (
      ['EXTERNAL_SLACK_CLIENT_ID', 'EXTERNAL_SLACK_SECRET'].includes(field) ||
      shouldDisableSmsFields
    )
  }

  const showAlert = (title: string) => {
    switch (title) {
      // TODO (KM): Remove after 10th October 2024 when we disable the provider
      case 'Slack (Deprecated)':
        return (
          <Alert_Shadcn_ variant="warning">
            <WarningIcon />
            <AlertTitle_Shadcn_>Slack (Deprecated) Provider</AlertTitle_Shadcn_>
            <AlertDescription_Shadcn_>
              Recently, Slack has updated their OAuth API. Please use the new Slack (OIDC) provider
              below. Developers using this provider should move over to the new provider. Please
              refer to our{' '}
              <a
                href="https://supabase.com/docs/guides/auth/social-login/auth-slack"
                className="underline"
                target="_blank"
              >
                documentation
              </a>{' '}
              for more details.
            </AlertDescription_Shadcn_>
          </Alert_Shadcn_>
        )
      case 'Phone':
        return (
          config.HOOK_SEND_SMS_ENABLED && (
            <Alert_Shadcn_>
              <WarningIcon />
              <AlertTitle_Shadcn_>
                SMS provider settings are disabled while the SMS hook is enabled.
              </AlertTitle_Shadcn_>
              <AlertDescription_Shadcn_ className="flex flex-col gap-y-3">
                <p>The SMS hook will be used in place of the SMS provider configured</p>
                <Button asChild type="default" className="w-min" icon={<ExternalLink />}>
                  <Link href={`/project/${projectRef}/auth/hooks`}>View auth hooks</Link>
                </Button>
              </AlertDescription_Shadcn_>
            </Alert_Shadcn_>
          )
        )
      default:
        return null
    }
  }

  const { data: settings } = useProjectSettingsV2Query({ projectRef })
  const protocol = settings?.app_config?.protocol ?? 'https'
  const endpoint = settings?.app_config?.endpoint
  const apiUrl = `${protocol}://${endpoint}`

  const { data: customDomainData } = useCustomDomainsQuery({ projectRef })

  const INITIAL_VALUES = (() => {
    const initialValues: { [x: string]: string | boolean } = {}
    Object.keys(provider.properties).forEach((key) => {
      const isDoubleNegative = doubleNegativeKeys.includes(key)
      if (provider.title === 'SAML 2.0') {
        const configValue = (config as any)[key]
        initialValues[key] =
          configValue || (provider.properties[key].type === 'boolean' ? false : '')
      } else {
        if (isDoubleNegative) {
          initialValues[key] = !(config as any)[key]
        } else {
          const configValue = (config as any)[key]
          initialValues[key] = configValue
            ? configValue
            : provider.properties[key].type === 'boolean'
              ? false
              : ''
        }
      }
    })
    return initialValues
  })()

  const onSubmit = (values: any, { resetForm }: any) => {
    const payload = { ...values }
    Object.keys(values).map((x: string) => {
      if (doubleNegativeKeys.includes(x)) payload[x] = !values[x]
      if (payload[x] === '') payload[x] = null
    })

    updateAuthConfig(
      { projectRef: projectRef!, config: payload },
      {
        onSuccess: () => {
          resetForm({ values: { ...values }, initialValues: { ...values } })
          setOpen(false)
          toast.success('Successfully updated settings')
        },
      }
    )
  }

  return (
    <>
      <ResourceItem
        onClick={() => setOpen(true)}
        media={
          <img
            src={`${BASE_PATH}/img/icons/${provider.misc.iconKey}.svg`}
            width={18}
            height={18}
            alt={`${provider.title} auth icon`}
          />
        }
        meta={
          isActive ? (
            <div className="flex items-center gap-1 rounded-full border border-brand-400 bg-brand-200 py-1 px-1 text-xs text-brand">
              <span className="rounded-full bg-brand p-0.5 text-xs text-brand-200">
                <Check strokeWidth={2} size={12} />
              </span>
              <span className="px-1">Enabled</span>
            </div>
          ) : (
            <div className="rounded-md border border-strong bg-surface-100 py-1 px-3 text-xs text-foreground-lighter">
              Disabled
            </div>
          )
        }
      >
        {provider.title}
      </ResourceItem>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col gap-0">
          <SheetHeader className="shrink-0">
            <SheetTitle>{provider.title}</SheetTitle>
          </SheetHeader>
          <Form
            id={`provider-${provider.title}-form`}
            name={`provider-${provider.title}-form`}
            initialValues={INITIAL_VALUES}
            validationSchema={provider.validationSchema}
            onSubmit={onSubmit}
            className="flex-1 overflow-hidden flex flex-col"
          >
            {({ handleReset, initialValues, values, setFieldValue }: any) => {
              const noChanges = JSON.stringify(initialValues) === JSON.stringify(values)
              return (
                <>
                  <div className="flex-1 overflow-y-auto group py-6 px-4 md:px-6 text-foreground">
                    <div className="mx-auto my-2 md:my-6 max-w-lg space-y-6">
                      {showAlert(provider.title)}
                      {Object.keys(provider.properties).map((x: string) => (
                        <FormField
                          key={x}
                          name={x}
                          setFieldValue={setFieldValue}
                          properties={provider.properties[x]}
                          formValues={values}
                          disabled={shouldDisableField(x) || !canUpdateConfig}
                        />
                      ))}

                      {provider?.misc?.alert && (
                        <Admonition
                          type="warning"
                          title={provider.misc.alert.title}
                          description={
                            <>
                              <ReactMarkdown>{provider.misc.alert.description}</ReactMarkdown>
                            </>
                          }
                        />
                      )}

                      {provider.misc.requiresRedirect && (
                        <>
                          <Input
                            copy
                            readOnly
                            disabled
                            label="Callback URL (for OAuth)"
                            value={
                              customDomainData?.customDomain?.status === 'active'
                                ? `https://${customDomainData.customDomain?.hostname}/auth/v1/callback`
                                : `${apiUrl}/auth/v1/callback`
                            }
                            descriptionText={
                              <Markdown
                                content={provider.misc.helper}
                                className="text-foreground-lighter"
                              />
                            }
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <SheetFooter className="shrink-0">
                    <div className="flex items-center justify-between w-full">
                      <DocsButton href={provider.link} />
                      <div className="flex items-center gap-x-3">
                        <Button
                          type="default"
                          htmlType="reset"
                          onClick={() => {
                            handleReset()
                            setOpen(false)
                          }}
                          disabled={isUpdatingConfig}
                        >
                          Cancel
                        </Button>
                        <ButtonTooltip
                          htmlType="submit"
                          loading={isUpdatingConfig}
                          disabled={isUpdatingConfig || !canUpdateConfig || noChanges}
                          tooltip={{
                            content: {
                              side: 'bottom',
                              text: !canUpdateConfig
                                ? 'You need additional permissions to update provider settings'
                                : undefined,
                            },
                          }}
                        >
                          Save
                        </ButtonTooltip>
                      </div>
                    </div>
                  </SheetFooter>
                </>
              )
            }}
          </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ProviderForm

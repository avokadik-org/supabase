import { useEffect, useState } from 'react'
import supabase from '~/lib/supabaseAdmin'
import Link from 'next/link'
import { Database } from '~/types/supabase'
import CMSLayout from '~/components/Layouts/CMSLayout'
import { Button } from 'ui'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Meetup = Database['public']['Tables']['meetups']['Row']
type MeetupInsert = Database['public']['Tables']['meetups']['Insert']

export default function MeetupsCMS() {
  const [meetups, setMeetups] = useState<Meetup[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [meetupToDelete, setMeetupToDelete] = useState<Meetup | null>(null)
  const { basePath } = useRouter()

  useEffect(() => {
    fetchMeetups()
  }, [])

  async function fetchMeetups() {
    const { data, error } = await supabase.from('meetups').select('*')

    if (error) {
      console.error('Error fetching meetups:', error)
      return
    }

    setMeetups(data as Meetup[])
  }

  async function handleImport(meetups: MeetupInsert[]) {
    const { error } = await supabase.from('meetups').insert(meetups)

    if (error) {
      console.error('Error importing meetups:', error)
      return
    }

    // Refresh the list after import
    fetchMeetups()
  }

  async function handleDelete() {
    if (!meetupToDelete) return

    const { error } = await supabase.from('meetups').delete().eq('id', meetupToDelete.id.toString())

    if (error) {
      console.error('Error deleting meetup:', error)
      return
    }

    // Refresh the list after deletion
    fetchMeetups()
    setShowDeleteConfirm(false)
    setMeetupToDelete(null)
  }

  // Group meetups by country
  const meetupsByCountry = meetups.reduce(
    (acc, meetup) => {
      const country = meetup.country || 'Uncategorized'
      if (!acc[country]) {
        acc[country] = []
      }
      acc[country].push(meetup)
      return acc
    },
    {} as Record<string, Meetup[]>
  )

  // Convert to array and sort by country name
  const countryGroups = Object.entries(meetupsByCountry).sort(([a], [b]) => a.localeCompare(b))

  // Calculate how many countries should go in each column
  const countriesPerColumn = Math.ceil(countryGroups.length / 3)
  const columns = [
    countryGroups.slice(0, countriesPerColumn),
    countryGroups.slice(countriesPerColumn, countriesPerColumn * 2 - 7),
    countryGroups.slice(countriesPerColumn * 2 - 7),
  ]

  return (
    <CMSLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="h1">Meetups CMS</h1>
          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/cms/meetups">All Meetups</Link>
            </Button>
          </div>
        </div>

        <div className="relative font-['Departure_Mono'] text-foreground-lighter w-[1200px] h-[670px] bg-alternative text-lg border flex items-start justify-center gap-2 p-10">
          <Image
            src={`${basePath}/images/launchweek/14/meetups-og-bg.png`}
            alt="meetups bg"
            width={1200}
            height={600}
            className="absolute inset-0 w-full h-full bg-cover"
            quality={100}
          />
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="relative z-10 flex-1 flex flex-col">
              {columnIndex === 0 && (
                <div className="text-2xl mb-12 flex items-center gap-3 text-foreground">
                  <svg
                    width="27"
                    height="25"
                    viewBox="0 0 71 81"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="30" width="10" height="10" fill="white" />
                    <rect x="10" y="20" width="10" height="10" fill="white" />
                    <rect x="10" y="30" width="10" height="10" fill="white" />
                    <rect x="20" y="20" width="10" height="10" fill="white" />
                    <rect x="20" y="40" width="10" height="10" fill="white" />
                    <rect x="10" y="40" width="10" height="10" fill="white" />
                    <rect y="40" width="10" height="10" fill="white" />
                    <rect x="20" y="10" width="10" height="10" fill="white" />
                    <rect x="30" width="10" height="10" fill="white" />
                    <rect x="30" y="10" width="10" height="10" fill="white" />
                    <rect x="30" y="20" width="10" height="10" fill="white" />
                    <rect x="20" y="30" width="10" height="10" fill="white" />
                    <rect x="30" y="30" width="10" height="10" fill="white" />
                    <rect x="40" y="30" width="10" height="10" fill="white" />
                    <rect x="50" y="30" width="10" height="10" fill="white" />
                    <rect x="60" y="30" width="10" height="10" fill="white" />
                    <rect x="30" y="40" width="10" height="10" fill="white" />
                    <rect x="30" y="60" width="10" height="10" fill="white" />
                    <rect x="30" y="70" width="10" height="10" fill="white" />
                    <rect x="30" y="50" width="10" height="10" fill="white" />
                    <rect x="40" y="40" width="10" height="10" fill="white" />
                    <rect x="40" y="50" width="10" height="10" fill="white" />
                    <rect x="50" y="50" width="10" height="10" fill="white" />
                    <rect x="40" y="60" width="10" height="10" fill="white" />
                    <rect x="50" y="40" width="10" height="10" fill="white" />
                    <rect x="60" y="40" width="10" height="10" fill="white" />
                  </svg>
                  <span>LW14 Meetups</span>
                </div>
              )}
              {column.map(([country, countryMeetups]) => (
                <div key={country} className="">
                  <div className="grid grid-cols-[130px_1fr] gap-4">
                    <div className="">{country}</div>
                    <div className="gap-1">
                      {[...countryMeetups]
                        .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
                        .map((meetup) => (
                          <div key={meetup.id} className="text-foreground">
                            {meetup.title || 'Unnamed Meetup'}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </CMSLayout>
  )
}

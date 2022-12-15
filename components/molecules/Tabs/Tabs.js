import classNames from 'classnames'

export function TabsHeader({ headers, activeTab, setActiveTab }) {
  return (
    <div className='flex flex-row gap-1'>
      {headers.map((header, index) => (
        <div
          key={index}
          className={classNames(
            activeTab === header.key
              ? 'shadow-xl bg-indigo-200'
              : 'bg-indigo-100/80',
            `text-center rounded p-3`
          )}
          style={{
            width: `${100 / headers.length}%`,
          }}
          onClick={() => setActiveTab(header.key)}
        >
          {header.content}
        </div>
      ))}
    </div>
  )
}

export function TabsBody({ bodies, activeTab, setActiveTab }) {
  return (
    <div>
      {bodies.map((body, index) => (
        <div
          key={index}
          className={classNames(activeTab === body.key ? '' : 'hidden', 'p-8')}
          onClick={() => setActiveTab(body.key)}
        >
          {body.content}
        </div>
      ))}
    </div>
  )
}

import IconHome from '../UI/Icons/IconHome'
import IconWorkout from '../UI/Icons/IconWorkout'
import IconProgram from '../UI/Icons/IconProgram'
import IconExercise from '../UI/Icons/IconExercise'
import IconProfile from '../UI/Icons/IconProfile'
import IconAdmin from '../UI/Icons/IconAdmin'
import NavItem from '../UI/NavItem'

export default function AppNavList() {
  const paths = [
    {
      label: 'home',
      path: '/',
      icon: <IconHome className="w-6 h-6 " />,
    },
    {
      label: 'workouts',
      path: '/workouts',
      icon: <IconWorkout className="w-6 h-6 " />,
    },
    {
      label: 'programs',
      path: '/programs',
      icon: <IconProgram className="w-6 h-6 " />,
    },
    {
      label: 'exercises',
      path: 'exercises',
      icon: <IconExercise className="w-6 h-6 " />,
    },
    {
      label: 'profile',
      path: '/profile',
      icon: <IconProfile className="w-6 h-6 " />,
    },
    {
      label: 'admin',
      path: '/admin',
      icon: <IconAdmin className="w-6 h-6 " />,
    },
  ]

  return (
    <nav className="w-full h-full">
      <ul className="flex justify-around items-center h-full bg-main-black text-white">
        {paths.map((p) => (
          <li key={p.path}>
            <NavItem
              navItem={p}
              activeClass="text-amber stroke-amber"
              inactiveClass="grid items-center justify-items-center stroke-white transition-all duration-300"
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}

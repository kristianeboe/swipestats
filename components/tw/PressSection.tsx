/* This example requires Tailwind CSS v2.0+ */
const posts = [
  {
    title: 'I analyzed hundreds of user’s Tinder data — including messages — so you don’t have to.',
    href: 'https://towardsdatascience.com/i-analyzed-hundreds-of-users-tinder-data-including-messages-so-you-dont-have-to-14c6dc4a5fdd',
    category: {
      name: 'Article',
      href: 'https://towardsdatascience.com/i-analyzed-hundreds-of-users-tinder-data-including-messages-so-you-dont-have-to-14c6dc4a5fdd',
    },
    description:
      'The data is embarrassingly intimate, but reveals the most boring parts of ourselves we already knew. I read Modern Romance by Aziz Ansari in 2016 and beyond a shadow of a doubt, it is one of the most influential books I’ve ever read...',
    date: 'Aug 10, 2021',
    datetime: '2021-08-10',
    imageUrl: 'https://miro.medium.com/max/1400/1*VqIdzn99v1VmeQVD34pO_w.jpeg',
    readingTime: '13 min',
    author: {
      name: 'Alyssa Beatriz Fernandez',
      href: 'https://medium.com/@alyssabeatrizfernandez',
      imageUrl: 'https://miro.medium.com/fit/c/262/262/0*PUwLMwezgreBAaS2',
    },
  },
  {
    title: 'Why Do Women Have the Upper Hand on Tinder?',
    href: 'https://thebolditalic.com/the-two-worlds-of-tinder-f1c34e800db4',
    category: {
      name: 'Article',
      href: 'https://thebolditalic.com/the-two-worlds-of-tinder-f1c34e800db4',
    },
    description:
      'Explaining the two worlds of the dating app. Over the last decade, Tinder has redefined the online dating industry. The app has proven especially popular among young people, with three-quarters of those ages 18 to 24 reporting using the app at one point...',
    date: 'Mar 8, 2021',
    datetime: '2021-03-08',
    imageUrl: 'https://miro.medium.com/max/1400/1*lrOlpLXLCam7Dgb-zK3rsA.jpeg',
    readingTime: '5 min',
    author: {
      name: 'Brayden Gerrard',
      href: 'https://braydeng.medium.com/',
      imageUrl: 'https://miro.medium.com/fit/c/262/262/1*FRURVIuFwaNcTAj9_LxOxw.jpeg',
    },
  },
  {
    title: 'When love is an automated swipe',
    href: 'https://www.michigandaily.com/statement/when-love-is-an-automated-swipe/',
    category: { name: 'Case Study', href: '#' },
    description:
      'Apps like Tinder, Bumble, Grindr and Hinge offer endless erotic possibilities. Like an unregulated free market of dating, they present profile after eligible profile and ask users to sort them using a simple hot-or-not binary.',
    date: 'Dec 8, 2021',
    datetime: '2021-12-08',
    imageUrl:
      'https://i0.wp.com/www.michigandaily.com/wp-content/uploads/2021/12/SoJung-Ham-Annie-Rauwerda.jpg?w=1918&ssl=1',
    readingTime: '8 min',
    author: {
      name: 'Annie Rauwerda @michigandaily',
      href: 'https://www.michigandaily.com/author/cap-annie-rauwerda/',
      imageUrl:
        'https://www.michigandaily.com/wp-content/uploads/2021/03/cropped-michigan-daily-icon-200x200.png?crop=1',
    },
  },
  {
    title:
      '[OC] Despite being far more selective, women still match more frequently than men on Tinder',
    href: 'https://www.reddit.com/r/dataisbeautiful/comments/mbf6wg/oc_despite_being_far_more_selective_women_still/',
    category: { name: 'Case Study', href: '#' },
    description: 'A reddit post with more than 10 000 upvotes and 1000+ comments',
    date: 'Mar 23, 2021',
    datetime: '2021-03-23',
    imageUrl:
      'https://preview.redd.it/8wzwio329so61.png?width=960&crop=smart&auto=webp&s=9b5813ca84cbb05d96693844ed61988b90be09c3',
    readingTime: '4 min',
    author: {
      name: 'raptorman556 @reddit',
      href: 'https://www.reddit.com/user/raptorman556/',
      imageUrl: '/images/Reddit_Mark_OnWhite.png',
    },
  },
];

// https://samurai.science/2021/12/14/exactly-why-do-ladies-experience-the-upper-hand-on/#more-24413
// https://steemit.com/steemhunt/@kamchore/swipestats-io-visualize-your-tinder-data
// https://aienglish.com.au/2021/12/13/lets-say-youve-come-on-bumble-for-a-hot-min/
// https://www.sdpnoticias.com/estilo-de-vida/tendencias/tinder-datos-senalan-que-las-mujeres-tienen-mayor-facilidad-para-encontrar-pareja/
// https://www.reddit.com/r/dataisbeautiful/comments/mbf6wg/oc_despite_being_far_more_selective_women_still/
// https://www.bunnychow.co.za/over-the-last-many-years-tinder-features-broadened/
// https://fikom.unikamamuju.ac.id/?p=35723

export function PressSection() {
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Swipestats on the web, newspapers, and science papers
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Swipestats has already inspired numerous articles, from scientific to simply observant.
            Looking to write your own take on the data? Send us a message
          </p>
        </div>
        <div className="mt-12 max-w-7xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-none">
          {posts.map((post) => (
            <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href={post.category.href} className="hover:underline">
                      {post.category.name}
                    </a>
                  </p>
                  <a href={post.href} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.description}</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span>
                      <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={post.author.href} className="hover:underline">
                        {post.author.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

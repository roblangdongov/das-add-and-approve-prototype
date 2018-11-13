const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});


// Get Sprint and Feature for URL links
router.use('/', (req, res, next) => {
  req.version = req.originalUrl.split('/')[1] // this is added by DC project
  req.feature = req.originalUrl.split('/')[1]
  req.sprint = req.originalUrl.split('/')[2]
  res.locals.version = req.version // this is added by DC project
  res.locals.feature = req.feature
  res.locals.sprint = req.sprint
 // var arse = req.params[0];
  next()
})


// Versions routing stuff - so indivdual routes are in the sub version
router.use(/\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/version-${req.params[0]}/routes`)(req, res, next);
})

console.log('main routes loaded');
router.get('/', (req, res) => {
  res.render('index')
})

/// Employers ID setup

// Start Dummy Data
const dummy_employer_1 = {
  id: "XJBMNV",
  name: "Assurance Aerospace Engineering"
}

const dummy_employer_2 = {
  id: "PPJTRA",
  name: "; DROP TABLE \"COMPANIES\";-- LTD"
}


router.use(function (req, res, next) {
  if (!req.session.employers) {
    console.log("Adding employers to session");
    req.session.employers = [dummy_employer_1, dummy_employer_2];
  }
  next();
})


router.param('employer', function (req, res, next, employer) {
  var employers = req.session.employers.filter(e => e.id == employer);
  if (employers.length == 1) {
    res.locals.employer = employers[0];
  }
  next();
});


///// End of employers ID stuff

// routing the app 
// /// This is just a test version.
// router.get('/version-1/manage-apprenticeships/branch1' , function (req, res) {
//   // Get the answer from the query string (eg. ?over18=false)
//   var over18 = req.query.over18

//   if (over18 === 'false') {
//     // Redirect to the relevant page
//     res.redirect(`/${req.version}/manage-apprenticeships/branch2`)
//   } else {
//     // If over18 is any other value (or is missing) render the page requested
//     res.render(`${req.version}/manage-apprenticeships/branch1`)
//   }
// })



// Employer > Nav > Home
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/homeNav', function (req, res) {
  res.redirect(`/${req.version}/home`)
 })

  router.get('/*/*/homeNav', function (req, res) {
  res.redirect(`/${req.version}/home`)
 })

 // Employer > Nav > Finance
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/financeNav', function (req, res) {
  res.redirect(`/${req.version}/finance`)
 })

  router.get('/*/*/financeNav', function (req, res) {
  res.redirect(`/${req.version}/finance`)
 })

   // Employer > Nav > Apprentices
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/apprenticesNav', function (req, res) {
  res.redirect(`/${req.version}/apprentices`)
 })

  router.get('/*/*/apprenticesNav', function (req, res) {
  res.redirect(`/${req.version}/apprentices`)
 })

   // Employer > Nav > Team
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/teamNav', function (req, res) {
  res.redirect(`/${req.version}/team`)
 })

  router.get('/*/*/teamNav', function (req, res) {
  res.redirect(`/${req.version}/team`)
 })

// Employer > Nav > Orgs
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/orgsNav', function (req, res) {
  res.redirect(`/${req.version}/orgs`)
 })

  router.get('/*/*/orgsNav', function (req, res) {
  res.redirect(`/${req.version}/orgs`)
 })

// Employer > Nav > PAYE
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/payeNav', function (req, res) {
  res.redirect(`/${req.version}/paye`)
 })

  router.get('/*/*/payeNav', function (req, res) {
  res.redirect(`/${req.version}/paye`)
 })

  // Employer > Nav > Help
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/helpNav', function (req, res) {
  res.redirect(`/${req.version}/help`)
 })

  router.get('/*/*/helpNav', function (req, res) {
  res.redirect(`/${req.version}/help`)
 })

    // Employer > Nav > Settings
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/settingsNav', function (req, res) {
  res.redirect(`/${req.version}/settings`)
 })

  router.get('/*/*/settingsNav', function (req, res) {
  res.redirect(`/${req.version}/settings`)
 })



    // Employer > Nav > Microsite >Home
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/micrositeNav', function (req, res) {
  res.redirect(`/${req.version}/microsite`)
 })

  router.get('/*/*/micrositeNav', function (req, res) {
  res.redirect(`/${req.version}/microsite`)
 })


  // Employer > Nav > Microsite > Stories
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/storiesNav', function (req, res) {
  res.redirect(`/${req.version}/microsite/stories`)
 })

  router.get('/*/*/storiesNav', function (req, res) {
  res.redirect(`/${req.version}/microsite/stories`)
 })

    // Employer > Nav > Microsite > Find out
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/howToNav', function (req, res) {
  res.redirect(`/${req.version}/microsite/guide`)
 })

  router.get('/*/*/howToNav', function (req, res) {
  res.redirect(`/${req.version}/microsite/guide`)
 })


////// End employer nav routes

/////Provider nav routes


// Provider > Nav > Home
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/proHomeNav', function (req, res) {
  res.redirect(`/${req.version}/provider/home`)
 })

  router.get('/*/*/proHomeNav', function (req, res) {
  res.redirect(`/${req.version}/provider/home`)
 })


// Provider > Nav > Manage
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/proApprenticesNav', function (req, res) {
  res.redirect(`/${req.version}/provider/manage`)
 })

  router.get('/*/*/proApprenticesNav', function (req, res) {
  res.redirect(`/${req.version}/provider/manage`)
 })



// Provider > Nav > Cohorts
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/proCohortsNav', function (req, res) {
  res.redirect(`/${req.version}/provider/proCohorts`)
 })

  router.get('/*/*/proCohortsNav', function (req, res) {
  res.redirect(`/${req.version}/provider/proCohorts`)
 })

  // Provider > Nav > Agreement IDs
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/proAgreementNav', function (req, res) {
  res.redirect(`/${req.version}/provider/orgsAndAgree`)
 })

  router.get('/*/*/proAgreementNav', function (req, res) {
  res.redirect(`/${req.version}/provider/orgsAndAgree`)
 })






////End provider nav routes


    // Employer > Nav > Sign Out
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/signoutNav', function (req, res) {
  res.redirect(`/${req.version}/signout`)
 })

  router.get('/*/*/signoutNav', function (req, res) {
  res.redirect(`/${req.version}/signout`)
 })

////// end of nav routing


/// registration > used service before?
router.get('/*/manage-apprenticeships/signin' , function (req, res) {
  var usedService = req.query.usedService
  if (usedService === 'false') {
    res.redirect(`/${req.version}/manage-apprenticeships/whatyoullneed`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})

/*
/// team > added new team member where to
router.get('/version-1/team/whatsNextTeam' , function (req, res) {
  var teamWhatsNext = req.query.teamwhatsnext
  if (teamWhatsNext === 'another') {
    res.redirect(`/${req.version}/arse`)
  } else {}
    if (teamWhatsNext === 'viewall') {
    res.redirect(`/${req.version}/arse32`)
  } 
    if (teamWhatsNext === 'returnhome') {
    res.redirect(`/${req.version}/arse3`)
  }  
})
*/

// This should remove a trailing slash from the end of the URL that occassionaly breaks the urls and redirects
router.use(function(req, res, next) {
      if (req.path.length > 1 && /\/$/.test(req.path)) {
        var query = req.url.slice(req.path.length)
        res.redirect(301, req.path.slice(0, -1) + query)
      } else {
        next()
      }
    });


// Nav home
//router.get('/version-1/arse', function (req, res) {
 // res.render(`/${req.version}/home/index`);
 //})


/// team > added new team member where to
router.get('/*/team/whatsNextTeam' , function (req, res) {
  var teamWhatsNext = req.query.teamwhatsnext
       switch (true) {
          case  (teamWhatsNext == 'another'):
           res.redirect(`/${req.version}/team/add-new-user`)
            break;
        case  (teamWhatsNext == 'viewall'):
        res.redirect(`/${req.version}/team`)
          break
         case  (teamWhatsNext == 'returnhome'):
          res.redirect(`/${req.version}/home`)
          break
        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// orgs > whats next after adding an org
router.get('/*/orgs/whatsNextOrgs' , function (req, res) {
  var orgsWhatsNext = req.query.orgswhatsnext
       switch (true) {
          case  (orgsWhatsNext == 'agreement'):
           res.redirect(`/${req.version}/orgs/droptablesign`)
            break;
        case  (orgsWhatsNext == 'team'):
        res.redirect(`/${req.version}/team`)
          break
         case  (orgsWhatsNext == 'another'):
          res.redirect(`/${req.version}/orgs/searchOrg`)
          break
                   case  (orgsWhatsNext == 'home'):
          res.redirect(`/${req.version}/home`)
          break
        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// paye > whats next after adding an paye
router.get('/*/paye/whatsNextPaye' , function (req, res) {
  var payeWhatsNext = req.query.payeWhatsNext
       switch (true) {
          case  (payeWhatsNext == 'paye'):
            res.redirect(`/${req.version}/paye/allowtaxdetails`)
           break;

          case  (payeWhatsNext == 'finance'):
              res.redirect(`/${req.version}/finance`)
          break;

          case  (payeWhatsNext == 'home'):
              res.redirect(`/${req.version}/home`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// paye > whats next after removing a paye
router.get('/*/paye/payeRemove' , function (req, res) {
  var removePaye = req.query.removePaye
       switch (true) {
          case  (removePaye == 'true'):
            res.redirect(`/${req.version}/paye`)
           break;

          case  (removePaye == 'false'):
              res.redirect(`/${req.version}/paye`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})

/// paye > whats next after removing a paye
router.get('/*/find/chooseFATType' , function (req, res) {
  var fatType = req.query.fatType
       switch (true) {
          case  (fatType == 'apprenticeship'):
            res.redirect(`/${req.version}/find/appreticeshipsearch`)
           break;

          case  (fatType == 'provider'):
              res.redirect(`/${req.version}/find/findaprovider`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// Add apprentices > confirm the training provider
router.get('/*/apprentices/add/confirming-training-provider' , function (req, res) {
  var confirmPro = req.query.confirmation
       switch (true) {
          case  (confirmPro == 'true'):
            res.redirect(`/${req.version}/apprentices/add/start-adding-apprentices`)
           break;

          case  (confirmPro == 'false'):
              res.redirect(`/${req.version}/apprentices/add/training-provider`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})



/// Add apprentices > add apprentices yourself or send to provider
router.get('/*/apprentices/add/addingApprentices' , function (req, res) {
  var confirmAddApps = req.query.addApprentices
       switch (true) {
          case  (confirmAddApps == 'true'):
            res.redirect(`/${req.version}/apprentices/add/review-cohort`)
           break;

          case  (confirmAddApps == 'false'):
              res.redirect(`/${req.version}/apprentices/add/message-for-training-provider`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Add apprentices > add apprentices yourself or send to provider
router.get('/*/apprentices/cohorts/editFinishedApprentice' , function (req, res) {
  var appCohortFinishedOption = req.query.appCohortFinishedOption
       switch (true) {
          case  (appCohortFinishedOption == 'approve'):
            res.redirect(`/${req.version}/apprentices/cohorts/message-for-training-provider`)
           break;

          case  (appCohortFinishedOption == 'send'):
              res.redirect(`/${req.version}/apprentices/cohorts/message-for-training-provider`)
          break;

          case  (appCohortFinishedOption == 'save'):
              res.redirect(`/${req.version}/apprentices/cohorts`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})



/// Change apprentices status > 
router.get('/*/apprentices/manage/appsChangeStatusRobEdwards' , function (req, res) {
  var status = req.query.status
       switch (true) {
          case  (status == 'Paused'):
            res.redirect(`/${req.version}/apprentices/manage/confirmPaused`)
           break;

          case  (status == 'Stopped'):
              res.redirect(`/${req.version}/apprentices/manage/confirmStopped`)
          break;

          case  (status == 'Return'):
              res.redirect(`/${req.version}/apprentices/manage/robEdwardsLive`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})


/// Forecast > Delete an apprenticeship you are forecasting against
router.get('/*/finance/projection/deleteForecastApprenticeship' , function (req, res) {
  var confirm = req.query.confirm
       switch (true) {
          case  (confirm == 'yes'):
            res.redirect(`/${req.version}/finance/projection/appRemoved`)
           break;

          case  (confirm == 'no'):
              res.redirect(`/${req.version}/finance/projection/canFund`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Confirming an employer
router.get('/*/provider/proCohorts/providerAgreedTraining' , function (req, res) {
  var confirmEmployer = req.query.confirmEmployer
       switch (true) {
          case  (confirmEmployer == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts/employerConnection`)
           break;

          case  (confirmEmployer == 'false'):
              res.redirect(`/${req.version}/provider/proCohorts/holdingPage`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Connected company check
router.get('/*/provider/proCohorts/employerConnectedCompany' , function (req, res) {
  var connectedCompany = req.query.connectedCompany
       switch (true) {
          case  (connectedCompany == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts/cohortView`)
           break;

          case  (connectedCompany == 'false'):
              res.redirect(`/${req.version}/provider/proCohorts/holdingPage`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Delete apprentice record
router.get('/*/provider/proCohorts/providerDeleteApprentice' , function (req, res) {
  var deleteApp = req.query.deleteApp
       switch (true) {
          case  (deleteApp == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts/cohortView`)
           break;

          case  (deleteApp == 'false'):
              res.redirect(`/${req.version}/provider/proCohorts/edit-apprentice`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})


/// Provider > Finished > send to employer
router.get('/*/provider/proCohorts/providerFinishedApprentice' , function (req, res) {
  var appCohortFinishedOption = req.query.appCohortFinishedOption
       switch (true) {
          case  (appCohortFinishedOption == 'approve'):
            res.redirect(`/${req.version}/provider/proCohorts/messageEmployers`)
           break;

          case  (appCohortFinishedOption == 'send'):
              res.redirect(`/${req.version}/provider/proCohorts/messageEmployers`)
          break;

           case  (appCohortFinishedOption == 'save'):
              res.redirect(`/${req.version}/provider/proCohorts`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Delete cohort
router.get('/*/provider/proCohorts/providerDeleteCohort' , function (req, res) {
  var deleteCohort = req.query.deleteCohort
       switch (true) {
          case  (deleteCohort == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts`)
           break;

          case  (deleteCohort == 'false'):
              res.redirect(`/${req.version}/provider/proCohorts/cohortView`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})


// /// Employer > Reserve funding > used saved?
// router.get('/*/finance/reserve/reserveSavedApprenticeship' , function (req, res) {
//   var confirm = req.query.confirm
//        switch (true) {
//           case  (confirm == 'yes'):
//             res.redirect(`/${req.version}/finance/reserve/chooseApp`)
//            break;

//           case  (confirm == 'no'):
//               res.redirect(`/${req.version}/find`)
//           break;

//         default:
//              console.log('gyahhhhhhhh, bork bork borka')
//             break;
//         }
// })

/// Employer > Reserve funding > used saved?
router.get('/*/finance/reserve/reserveNumberOfApps' , function (req, res) {
  var confirm = req.query.funding
       switch (true) {
          case  (confirm == 'Financial Services Administrator, Level 3'):
          console.log("arese");
            res.redirect(`/${req.version}/finance/reserve/find/appreticeshipsearch`)
           break;

        default:
            res.redirect(`/${req.version}/finance/reserve/reserveStartDate`)
            break;
        }
})


//// Might not be used anymore
/// Employer > Reserve funding > how are you recruiting
// http://127.0.0.1:3000/version-2/finance/changeReserve/howRecruiting
router.get('/*/finance/changeReserve/reserveHowRecruiting' , function (req, res) {
  var recruitType = req.query.recruitType
       switch (true) {
          case  (recruitType == 'useService'):
            res.redirect(`/${req.version}/finance/changeReserve/startRecruit`)
           break;
           case  (recruitType == 'acceptedService'):
            res.redirect(`/${req.version}/apprentices/add/fromRecruit/alreadyAccepted`)
           break;
           case  (recruitType == 'alreadyDone'):
            res.redirect(`/${req.version}/apprentices/fromRecruit/addApprentice`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

///// end of not used


/// Employer > Reserve funding > how are you recruiting
// http://127.0.0.1:3000/version-2/finance/changeReserve/howRecruiting
router.get('/*/finance/changeReserve/reserveHowRecruitingFoundYet' , function (req, res) {
  var recruitType = req.query.recruitType
       switch (true) {
          case  (recruitType == 'foundThem'):
            res.redirect(`/${req.version}/apprentices/add/fromRecruit/alreadyAccepted`)
           break;
          case  (recruitType == 'findThem'):
            res.redirect(`/${req.version}/finance/changeReserve/startRecruit`)
           break;
        default:
            console.log("bork bork bork");
            break;
        }
})


// chooseAnApprenticeToStart
/// Employer > Reserve funding > choose an apprentice to start
// http://127.0.0.1:3000/version-2/apprentices/add/fromRecruit/alreadyAccepted
router.get('/*/apprentices/add/fromRecruit/chooseAnApprenticeToStart' , function (req, res) {
  var recruitType = req.query.acceptedRecruit
       switch (true) {
          case  (recruitType == 'Rob Edwards'):
            res.redirect(`/${req.version}/apprentices/add/fromRecruit/addApprentice`)
           break;
           case  (recruitType == 'David Jenkins'):
            res.redirect(`/${req.version}/apprentices/add/fromRecruit/addApprentice`)
           break;
           case  (recruitType == 'someoneElse'):
            res.redirect(`/${req.version}/apprentices/add/addApprentice`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})



/// apprentices/add/fromRecruit/alreadyAccepted

/// Employer > Reserve funding > how are you recruiting
// http://127.0.0.1:3000/version-2/apprentices/fromRecruit/confirm-training-provider
router.get('/*/apprentices/fromRecruit/reserveCommitAddApprentice' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'true'):
          console.log("raa");
            res.redirect(`/${req.version}/apprentices/fromRecruit/addApprentice`)
           break;
           case  (confirmTraining == 'false'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/TBC`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > Reserve funding > how are you recruiting
// http://127.0.0.1:3000/version-2/apprentices/fromRecruit/finish?
router.get('/*/apprentices/fromRecruit/commitAddSingleApprenticeFinished' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'reserved'):
          console.log("raa");
            res.redirect(`/${req.version}/finance/changeReserve`)
           break;
           case  (confirmTraining == 'apprenticeships'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/apprentices/manage`)
           break;
                      case  (confirmTraining == 'homepage'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})





/// Employer > Reserve funding > finished reserving
//http://127.0.0.1:3000/version-2/finance/reserve/complete
router.get('/*/finance/reserve/finishedReserveFunding' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'hire'):
          console.log("raa");
            res.redirect(`/${req.version}/finance/changeReserve/howRecruiting`)
           break;

           case  (confirmTraining == 'reserve'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/finance/reserve`)
           break;

          case  (confirmTraining == 'view'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/finance/changeReserve`)
           break;

         case  (confirmTraining == 'homepage'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})






/// Employer > add apprentice > choose reserve funding
//http://127.0.0.1:3000/version-2/apprentices/add/chooseReserve
router.get('/*/apprentices/add/addApprenticesChooseReserve' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'Aeronautical engineer, Level 2'):
          console.log("raa");
            res.redirect(`/${req.version}/apprentices/add/addApprentice`)
           break;

           case  (confirmTraining == 'Mechanical engineer, Level 3'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/apprentices/add/addApprentice`)
           break;

          case  (confirmTraining == 'Financial Services Administrator, Level 3'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/apprentices/add/find/appreticeshipsearch`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > add apprentice  > finished adding
//http://127.0.0.1:3000/version-2/finance/reserve/complete
router.get('/*/apprentices/add/addApprenticeAddSingleApprenticeFinished' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'reserved'):
          console.log("raa");
            res.redirect(`/${req.version}/apprentices/add`)
           break;

           case  (confirmTraining == 'apprenticeships'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/apprentices/manage`)
           break;

         case  (confirmTraining == 'homepage'):
          console.log("alreadyDone");
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})



/// Employer > Add apprentice > where are they from
// http://127.0.0.1:3000/version-2/apprentices/howRecruiting
router.get('/*/apprentices/add/addApprenticeHowRecruiting' , function (req, res) {
  var confirmTraining = req.query.recruitType
       switch (true) {
          case  (confirmTraining == 'raa'):
            res.redirect(`/${req.version}/apprentices/add/fromRecruit/alreadyAccepted`)
           break;

           case  (confirmTraining == 'alreadyDone'):
            res.redirect(`/${req.version}/apprentices/add/chooseReserve`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})

/// Employer > add provider (provider permissions)  > finished adding a new one
// http://127.0.0.1:3000/version-2/savedProviders/add/finished?confirmation=true
router.get('/*/savedProviders/add/addProviderFinished' , function (req, res) {
  var confirmTraining = req.query.addProviderFinished
       switch (true) {
          case  (confirmTraining == 'QA Ltd'):
    
            res.redirect(`/${req.version}/savedProviders/cyberdyne`)
           break;

           case  (confirmTraining == 'providers'):
         
            res.redirect(`/${req.version}/savedProviders`)
           break;

         case  (confirmTraining == 'homepage'):
       
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > add apprentice > single or bulk
// http://127.0.0.1:3000/version-3/apprentices/add/nonLevyFull/oneOrBulk
router.get('/*/apprentices/add/nonLevyFull/oneOrBulkQuestion' , function (req, res) {
  var confirmTraining = req.query.oneOrBulk
       switch (true) {
          case  (confirmTraining == 'one'):
            res.redirect(`/${req.version}/apprentices/add/NonLevyFull/oneAtTime/alreadyAccepted`)
           break;

           case  (confirmTraining == 'bulk'):
            res.redirect(`/${req.version}//apprentices/add/nonLevyFull/bulkUpload/`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > v3 > add apprentice > choose apprentices to start
// http://127.0.0.1:3000/version-3/apprentices/add/NonLevyFull/oneAtTime/alreadyAccepted
router.get('/*/apprentices/add/nonLevyFull/oneAtTime/chooseAnApprenticeToStartV3Manage' , function (req, res) {
  var confirmTraining = req.query.acceptedRecruit
       switch (true) {
          case  (confirmTraining == 'Rob Edwards'):
            req.session.data['FirstFirstName'] = 'Rob';
            req.session.data['FirstLastName'] = 'Edwards';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

           case  (confirmTraining == 'David Jenkins'):
            req.session.data['FirstFirstName'] = 'David';
            req.session.data['FirstLastName'] = 'Jenkins';

            req.session.data['dob-day'] = '5';
            req.session.data['dob-month'] = 'May';
            req.session.data['dob-year'] = '2000';

            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeConfirm`)
           break;

          case  (confirmTraining == 'someoneElse'):
            res.redirect(`/${req.version}/apprentices/add/NonLevyFull/oneAtTime/chooseReserve`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > v3 > add apprentice > choose reserved funding
// http://127.0.0.1:3000/version-3/apprentices/add/NonLevyFull/oneAtTime/chooseReserve
router.get('/*/apprentices/add/nonLevyFull/oneAtTime/addApprenticesChooseReserve' , function (req, res) {
  var confirmTraining = req.query.funding
       switch (true) {
          case  (confirmTraining == 'Aeronautical engineer, Level 2'):
            req.session.data['funding'] = 'Aeronautical engineer, Level 2';
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeAdd`)
           break;

           case  (confirmTraining == 'Mechanical engineer, Level 3'):
           req.session.data['funding'] = 'Mechanical engineer, Level 3';
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/apprenticeAdd`)
           break;

          case  (confirmTraining == 'Financial Services Administrator, Level 3'):
            req.session.data['funding'] = 'Financial Services Administrator, Level 3';
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneAtTime/FAT`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Employer > v3 > add apprentice > finished adding individual apprentice
// http://127.0.0.1:3000/version-3/apprentices/add/nonLevyFull/oneAtTime/finish?
router.get('/*/apprentices/add/nonLevyFull/oneAtTime/addApprenticeAddSingleApprenticeFinished' , function (req, res) {
  var confirmTraining = req.query.confirmTraining
       switch (true) {
          case  (confirmTraining == 'addAnother'):
            res.redirect(`/${req.version}/apprentices/add/nonLevyFull/oneOrBulk`)
           break;

           case  (confirmTraining == 'apprenticeships'):
            res.redirect(`/${req.version}/apprentices/manage`)
           break;

          case  (confirmTraining == 'homepage'):
            res.redirect(`/${req.version}/home`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Microsite > v3 > show guidance
// http://127.0.0.1:3000/version-3/microsite/guide/business
router.get('/*/microsite/guide/showPersonalisedGuidance' , function (req, res) {
  var confirmTraining = req.query.confirm
       switch (true) {
          case  (confirmTraining == 'yes'):
            res.redirect(`/${req.version}/notYet`)
           break;

           case  (confirmTraining == 'no'):
            res.redirect(`/${req.version}/microsite/guide/showall`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})



/// Microsite > v3 > apprentice or business
// http://127.0.0.1:3000/version-3/microsite/guide
router.get('/*/microsite/apprenticeorbusiness' , function (req, res) {
  var confirmTraining = req.query.confirm
       switch (true) {
          case  (confirmTraining == 'yes'):
            res.redirect(`/${req.version}/notYet`)
           break;

           case  (confirmTraining == 'no'):
            res.redirect(`/${req.version}/microsite/guide/business`)
           break;

        default:
            console.log("bork bork bork");
            break;
        }
})


/// Add apprentices > add apprentices yourself or send to provider
// router.get('/version-1/apprentices/add/finishAppEarly' , function (req, res) {
 // var optionFinishApps = req.query.optionFinishApps
   //    switch (true) {
     //     case  (optionFinishApps == 'send'):
       //     res.redirect(`/${req.version}/apprentices/cohorts/index`)
         //  break;

      //    case  (optionFinishApps == 'save'):
        //      res.redirect(`/${req.version}/apprentices/cohorts/index`)
          // break;

      //  default:
      //       console.log('gyahhhhhhhh, bork bork borka')
      //      break;
      //  }
// })



/// registration > what you'll need
//// Not using routes for this as has a weird behaviour on the no option, so dealt with in page.
/// manage-apprenticeships/whatyoullneed

/// registration > 

module.exports = router
